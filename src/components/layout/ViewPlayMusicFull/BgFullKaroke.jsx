import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlaying, setProgressInterval } from "../../../assets/redux/Features/settingPlayFeatures.js";
import { setIsSeek } from "../../../assets/redux/Features/LyricsFeatures.js";
import { LyricStyleds } from "../../../assets/styledComponents";
import { LoadingSvg } from "../../loading/LoadingSvg";

const Word = React.memo(({ data, refs, current, isSeek }) => {
   const { text, startTime, endTime } = data || {};
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
      } else if(current < startTime) { // Đặt độ rộng của thanh tiến trình về 0 nếu thời điểm hiện tại nhỏ hơn thời điểm bắt đầu
         progressBar.current.style.width = "0%";
      } else if(current < endTime) { // Loại bỏ hiệu ứng đi lên nếu thời điểm hiện tại nhỏ hơn thời điểm kết thúc
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

const BgFullKaroke = React.memo(() => {
   // Lấy giá trị currentTime từ Redux store
   const current = useSelector((state) => state.queueNowPlay.currentTime);
   // Lấy dữ liệu lyricByLine từ Redux store
   const lyricByLine = useSelector((state) => state.lyrics.lyricByLine);
   // Lấy trạng thái loading từ Redux store
   const loading = useSelector((state) => state.lyrics.loading);
   // Lấy kích thước Seek từ Redux store
   const isSeek = useSelector((state) => state.lyrics.isSeek);
   // Lấy kích thước văn bản từ Redux store
   const textSize = useSelector((state) => state.setting.text);
   // Sử dụng state để lưu trữ dữ liệu lyric
   const [state, setState] = useState([]);
   // Sử dụng useDispatch để gọi các hàm action từ Redux
   const dispatch = useDispatch();
   // Sử dụng useRef để lưu trữ giá trị giữa các lần render
   const ref0 = useRef(0);
   const ref1 = useRef(1);
   // Effect này cập nhật state khi lyricByLine thay đổi
   useLayoutEffect(() => {
      if (!lyricByLine) return;
      setState(lyricByLine?.map((data, index) => {
         // Tạo văn bản từ các từ trong mỗi dòng lyric
         const text = data.words.map((e) => e.data).join(" ");
         // Lấy startTime và endTime từ các từ đầu và cuối cùng trong mỗi dòng lyric
         const startTime = data.words[0].startTime / 1000;
         const endTime = data.words[data.words.length - 1].endTime / 1000;
         return { text, startTime, endTime, index };
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lyricByLine]);
   // Effect này xử lý khi âm thanh được seek đến
   useLayoutEffect(() => {
      const audio = document.querySelector("audio");
      const onSeekToAudio = () => {
         dispatch(setIsSeek(true));
         dispatch(setPlaying(false));
         // Thiết lập ref0 và ref1 tương ứng với các dòng lyric hiện tại
         if (current === 0) {
            ref0.current = 0;
            ref1.current = 1;
         };
         for (let i = 0; i < state?.length; i++) {
            if (current >= state[i].startTime && current <= state[i].endTime) {
               ref0.current = i - (i % 2 === 1 ? 1 : 0);
               ref1.current = i + (i % 2 === 1 ? 0 : 1);
               break;
            };
         };
         dispatch(setPlaying(true));
         setTimeout(() => dispatch(setIsSeek(false)), 300);
      };
      audio.addEventListener("seeked", onSeekToAudio);
      return () => audio.removeEventListener("seeked", onSeekToAudio);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [current, state]);
   // Effect này thiết lập interval cho việc cập nhật tiến trình mỗi 10ms
   useEffect(() => {
      dispatch(setProgressInterval(10));
      return () => dispatch(setProgressInterval(500));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   // Chọn kích thước văn bản dựa trên textSize từ Redux store
   const textSizeOptions = ["s", "m", "l"];
   // Nếu đang tải, hiển thị biểu tượng tải
   if (loading) return <LoadingSvg />;
   // Hiển thị component khi không có lỗi và có dữ liệu lyric
   return (
      <div className="nowplaying-body_item nowplaying-body_karaoke ">
         <ul className={`scroll-content ${textSizeOptions[textSize - 1]} inline-flex flex-col`}>
            {!loading && state && state.length > 0 && (
               <>
                  {/* Hiển thị từng dòng lyric tương ứng với ref0 và ref1 */}
                  <Word data={state[ref0.current]} refs={ref0} current={current} isSeek={isSeek} />
                  <Word data={state[ref1.current]} refs={ref1} current={current} isSeek={isSeek}/>
               </>
            )}
         </ul>
      </div>
   );
});


export default BgFullKaroke;
