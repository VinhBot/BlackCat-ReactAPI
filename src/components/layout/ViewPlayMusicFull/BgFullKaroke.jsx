import React, { memo, useLayoutEffect, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlaying, setProgressInterval } from "../../../assets/redux/Features/settingPlayFeatures.js";
import { setIsSeek } from "../../../assets/redux/Features/LyricsFeatures.js";
import { LyricStyleds } from "../../../assets/styledComponents";
import { LoadingSvg } from "../../loading/LoadingSvg";

const Word = memo(({ data, refs }) => {
   const { text, startTime, endTime } = data || {};
   // Lựa chọn trạng thái từ Redux
   const current = useSelector((state) => state.queueNowPlay.currentTime);
   const isSeek = useSelector((state) => state.lyrics.isSeek);
   // Refs cho các phần tử DOM
   const progressBar = useRef();
   const isUp = useRef(false);
   const liRef = useRef();
   // Hiệu ứng để cập nhật đánh dấu karaoke dựa trên thời điểm hiện tại
   useLayoutEffect(() => {
      // Kiểm tra nếu thời điểm hiện tại nằm trong khoảng thời gian của từ và không đang thực hiện tua
      if (current >= startTime && current <= endTime && !isSeek) {
         let res = ((100 / endTime - startTime) * (endTime - current) - 100) * -1 + 4;
         progressBar.current.style.width = res > 100 ? "100%" : res + "%";
      };
      // Xử lý hiệu ứng khi thời điểm hiện tại vượt quá thời điểm kết thúc
      if (current > endTime) {
         // Hàm xử lý hiệu ứng đi lên khi thời điểm hiện tại vượt quá thời điểm kết thúc
         const handleUpAnimation = async () => {
            isUp.current = true;
            await liRef.current?.classList.add("up");
            refs.current += 2;
         };
         handleUpAnimation();
      };
      // Đặt độ rộng của thanh tiến trình về 0 nếu thời điểm hiện tại nhỏ hơn thời điểm bắt đầu
      if (current < startTime) {
         progressBar.current.style.width = "0%";
      };
      // Loại bỏ hiệu ứng đi lên nếu thời điểm hiện tại nhỏ hơn thời điểm kết thúc
      if (current < endTime) {
         liRef.current.classList.remove("up");
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [current, isSeek]);
   // Hiển thị từ với đánh dấu karaoke
   return (
      <LyricStyleds ref={liRef} className={`item`}>
         <span>
            {text}
            <span ref={progressBar} className="kara-text-highlight">
               {text}
            </span>
         </span>
      </LyricStyleds>
   );
});

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
      let audio = document.querySelector("audio");
      const onSeekToAudio = () => {
         dispatch(setIsSeek(true))
         dispatch(setPlaying(false))
         if (current === 0) {
            ref0.current = 0;
            ref1.current = 1;
         };
         for (let i = 0; i < state?.length; i++) {
            if (current >= state[i].startTime && current <= state[i].endTime) {
               if (i % 2 === 0) {
                  ref0.current = i
                  ref1.current = i + 1
               } else {
                  ref0.current = i - 1
                  ref1.current = i
               };
            };
         };
         dispatch(setPlaying(true));
         setTimeout(() => dispatch(setIsSeek(false)), 300);
      };
      audio.addEventListener("seeked", onSeekToAudio);
      return () => audio.removeEventListener("seeked", onSeekToAudio);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      // toast("Karaoke đang quá trình phát triển, sẽ có lỗi khi seeked, Vui lòng thông cảm !", {
      //    type: "info",
      // });
      dispatch(setProgressInterval(10));
      return () => dispatch(setProgressInterval(500));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   let isTextSize;
   if (textSize === 1) {
      isTextSize = "s"
   }
   if (textSize === 2) {
      isTextSize = "m"
   }
   if (textSize === 3) {
      isTextSize = "l"
   }

   if(loading) return <LoadingSvg/>;

   return (
      <div className="nowplaying-body_item nowplaying-body_karaoke ">
         <ul className={`scroll-content ${isTextSize} inline-flex flex-col`}>
            {!loading && state && state.length > 0 && (
               <>
                  <Word data={state[ref0.current]} refs={ref0}/>
                  <Word data={state[ref1.current]} refs={ref1}/>
               </>
            )}
         </ul>
      </div>
   );
});

export default BgFullKaroke;
