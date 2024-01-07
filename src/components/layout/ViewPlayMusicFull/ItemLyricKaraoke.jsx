import React, { memo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { LyricStyled as LyricStyleds } from "../../../assets/styledComponents";

const ItemLyricKaraoke = memo(({ data }) => {
   const current = useSelector((state) => state.queueNowPlay.currentTime)
   const progressBar = useRef(null)

   let text = ""
   let e = data?.words
   data?.words?.forEach((e) => {
      text += e.data + " "
   })

   let startTime = e[0]?.startTime / 1000
   let endTime = e[e.length - 1]?.endTime / 1000

   useEffect(() => {
      if (current >= startTime && current <= endTime) {
         let duration = endTime - startTime

         if (endTime > current) {
            var radio = (100 / duration) * (endTime - current) - 100
            let res = radio * -1 + 3

            if (res > 100) {
               res = 100
            }

            progressBar.current.style.width = res + "%"
         }
      }

      if (current < startTime) {
         progressBar.current.style.width = 0 + "%"
      }
   }, [current])

   if (!data) {
      return
   }
   return (
      <LyricStyleds className={`item`}>
         <span>
            {text}
            <span ref={progressBar} className="kara-text-highlight">
               {text}
            </span>
         </span>
      </LyricStyleds>
   )
})

export default ItemLyricKaraoke
