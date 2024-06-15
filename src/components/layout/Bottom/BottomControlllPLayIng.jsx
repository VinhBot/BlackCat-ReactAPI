import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
// Import các action từ redux
import { setCurrentIndexSong, setCurrentIndexSongShuffle, setCurrentTime } from "../../../assets/redux/Features/QueueFeatures";
import { setPlay, setReady } from "../../../assets/redux/Features/settingPlayFeatures";
import { pushSongsLogged } from "../../../assets/redux/Features/loggedFeatures";
import { fancyTimeFormat } from "../../../assets/functions";
// Sử dụng React.memo để tối ưu hóa component
const BottomControlllPLayIng = React.memo(() => {
   const dispatch = useDispatch();
   // Lấy dữ liệu từ Redux store
   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong);
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId);
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent);
   const currentTime = useSelector((state) => state.queueNowPlay.currentTime);
   const playlist = useSelector((state) => state.logged.recentSongs);
   const settings = useSelector((state) => state.setting);
   // State cục bộ để kiểm tra xem đã seek hay chưa
   const [isSeeked, setIsSeeked] = useState(false);
   // Khởi tạo các ref cho các phần tử DOM và ReactPlayer
   const progressBarRef = useRef();
   const progressAreaRef = useRef();
   const audioRef = useRef();
   // Callback xử lý khi click vào thanh tiến trình
   const handleProgressClick = useCallback((e) => {
      const newTime = (e.nativeEvent.offsetX / progressAreaRef.current.clientWidth) * infoSongCurrent?.duration;
      progressBarRef.current.style.width = (newTime / infoSongCurrent?.duration) * 100 + "%";
      dispatch(setCurrentTime(newTime));
      audioRef.current.seekTo(newTime);
   }, [dispatch, infoSongCurrent]);
   // useEffect để thêm và gỡ bỏ event listener khi component unmount
   useEffect(() => {
      const handleBeforeUnload = () => dispatch(setPlay(false));
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
   }, [dispatch]);
   // useLayoutEffect để cập nhật chiều rộng của thanh tiến trình khi thời gian hiện tại thay đổi
   useLayoutEffect(() => {
      if (infoSongCurrent?.duration) {
         progressBarRef.current.style.width = (currentTime / infoSongCurrent.duration) * 100 + "%";
      }
   }, [currentTime, infoSongCurrent]);
   // Hàm xử lý khi ReactPlayer sẵn sàng
   const handleReady = () => {
      dispatch(setReady(true));
      if (!isSeeked && currentTime !== 0) {
         audioRef.current.seekTo(currentTime);
         setIsSeeked(true);
      }
      dispatch(pushSongsLogged(infoSongCurrent));
   };
   // Hàm xử lý khi ReactPlayer cập nhật tiến trình
   const handleProgress = (e) => dispatch(setCurrentTime(e.playedSeconds));
   // Hàm xử lý khi ReactPlayer kết thúc bài hát
   const handleEnd = (e) => {
      if (playlist.length > 1) {
         if (settings.isRandom) {
            dispatch(setCurrentIndexSongShuffle(currentIndexSong + 1));
         } else {
            dispatch(setCurrentIndexSong(currentIndexSong + 1));
         };
         dispatch(setReady(false));
         if (!settings.playing) {
            dispatch(setPlay(true));
         };
      };
   };
   // Hàm xử lý khi ReactPlayer gặp lỗi
   const handleError = () => {
      if (playlist.length - 1) {
         setTimeout(() => {
            dispatch(setCurrentIndexSong(currentIndexSong + 1));
            dispatch(setPlay(true));
         }, 1000);
      } else {
         dispatch(setCurrentIndexSong(0));
         dispatch(setPlay(true));
      };
      toast.error("Không thể phát bài hát này, vui lòng thử lại sau...");
   };
   return (
      <div className="player_bottom">
         {/* Hiển thị thời gian hiện tại của bài hát */}
         <p className="playing_time-left">{fancyTimeFormat(currentTime)}</p>
         {/* Khu vực thanh tiến trình */}
         <div onClick={handleProgressClick} ref={progressAreaRef} className="playing_time-up2 progress-area">
            <div ref={progressBarRef} className="progress-bar" />
            {/* Component ReactPlayer để phát audio */}
            <ReactPlayer
               width={0}
               height={0}
               ref={audioRef}
               progressInterval={settings.progressInterval}
               config={{ file: { forceAudio: true } }}
               onReady={handleReady}
               onProgress={handleProgress}
               onEnded={handleEnd}
               onError={handleError}
               playing={settings.playing}
               loop={settings.isLoop}
               volume={settings.volume}
               muted={settings.muted}
               url={currentEncodeId ? `http://api.mp3.zing.vn/api/streaming/audio/${currentEncodeId}/320` : ""}
            />
         </div>
         {/* Hiển thị tổng thời gian của bài hát */}
         <p className="playing_time-right">{fancyTimeFormat(infoSongCurrent?.duration)}</p>
      </div>
   );
});

export default BottomControlllPLayIng;
