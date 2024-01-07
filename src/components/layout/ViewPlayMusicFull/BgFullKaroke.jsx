import React, { memo, useLayoutEffect, useRef, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { setIsSeek } from "../../../assets/redux/Features/LyricsFeatures.js";
import { setPlaying, setProgressInterval } from "../../../assets/redux/Features/settingPlayFeatures.js"
import { LoadingSvg } from "../../loading/LoadingSvg"
import { LyricStyleds } from "../../../assets/styledComponents";

const Word = memo(({ data, index }) => {
   const liRef = useRef()
   const progressBar = useRef()
   const current = useSelector((state) => state.queueNowPlay.currentTime)
   const isSeek = useSelector((state) => state.lyrics.isSeek)
   const isUp = useRef(false)

   let text = data?.text
   let startTime = data?.startTime
   let endTime = data?.endTime

   const hi = async () => {
      isUp.current = true
      await liRef.current?.classList.add("up")
      index.current += 2
   }

   useLayoutEffect(() => {
      if (current >= startTime && current <= endTime && !isSeek) {
         let duration = endTime - startTime
         var radio = (100 / duration) * (endTime - current) - 100
         let res = radio * -1 + 4
         if (current < endTime) {
            if (res > 100) {
               res = 100
            }
            progressBar.current.style.width = res + "%"
         }
      }

      if (current > endTime) {
         hi()
      }

      if (current < startTime) {
         progressBar.current.style.width = 0 + "%"
      }

      if (current < endTime) {
         liRef.current.classList.remove("up")
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [current, isSeek])

   return (
      <LyricStyleds ref={liRef} className={`item`}>
         <span>
            {text}
            <span ref={progressBar} className="kara-text-highlight">
               {text}
            </span>
         </span>
      </LyricStyleds>
   )
})

const BgFullKaroke = memo(() => {
   const dispatch = useDispatch()
   const [state, setState] = useState([])
   const textSize = useSelector((state) => state.setting.text)
   const lyricByLine = useSelector((state) => state.lyrics.lyricByLine)
   const loading = useSelector((state) => state.lyrics.loading)
   const current = useSelector((state) => state.queueNowPlay.currentTime)
   // const isReady = useSelector((state) => state.setting.isReady)

   const ref0 = useRef(0)
   const ref1 = useRef(1)
   useLayoutEffect(() => {
      if (!lyricByLine) return

      let lyric = lyricByLine?.map((data, index) => {
         let text = ""
         let e = data.words
         data.words.forEach((e) => {
            text += e.data + " "
         })

         let startTime = e[0].startTime / 1000
         let endTime = e[e.length - 1].endTime / 1000

         return {
            text: text,
            startTime: startTime,
            endTime: endTime,
            index: index,
         }
      })

      setState(lyric);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lyricByLine])

   useLayoutEffect(() => {
      let audio = document.querySelector("audio")

      const onSeekToAudio = () => {
         dispatch(setIsSeek(true))
         dispatch(setPlaying(false))
         if (current === 0) {
            ref0.current = 0
            ref1.current = 1
         }

         for (let i = 0; i < state?.length; i++) {
            if (current >= state[i].startTime && current <= state[i].endTime) {
               if (i % 2 === 0) {
                  ref0.current = i
                  ref1.current = i + 1
               } else {
                  ref0.current = i - 1
                  ref1.current = i
               }
            }
         }
         dispatch(setPlaying(true))
         setTimeout(() => {
            dispatch(setIsSeek(false))
         }, 300)
      }

      audio.addEventListener("seeked", onSeekToAudio)

      return () => audio.removeEventListener("seeked", onSeekToAudio)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      toast("Karaoke đang quá trình phát triển, sẽ có lỗi khi seeked, Vui lòng thông cảm !", {
         type: "info",
      })
      dispatch(setProgressInterval(10))

      return () => {
         dispatch(setProgressInterval(500))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   let isTextSize
   if (textSize === 1) {
      isTextSize = "s"
   }
   if (textSize === 2) {
      isTextSize = "m"
   }
   if (textSize === 3) {
      isTextSize = "l"
   }

   if (loading) {
      return <LoadingSvg/>
   }

   return (
      <div className="nowplaying-body_item nowplaying-body_karaoke ">
         <ul className={`scroll-content ${isTextSize} inline-flex  flex-col`}>
            {!loading && state && state.length > 0 && (
               <>
                  <Word data={state[ref0.current]} index={ref0}></Word>
                  <Word data={state[ref1.current]} index={ref1}></Word>
               </>
            )}
         </ul>
      </div>
   )
})

export default BgFullKaroke
