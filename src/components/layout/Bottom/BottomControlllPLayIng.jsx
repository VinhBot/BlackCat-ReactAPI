import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

import { setCurrentIndexSong, setCurrentIndexSongShuffle, setCurrentTime } from "../../../assets/redux/Features/QueueFeatures.js";
import { setPlay, setReady } from "../../../assets/redux/Features/settingPlayFeatures.js";
import { pushSongsLogged } from "../../../assets/redux/Features/loggedFeatures.js";
import { fancyTimeFormat } from "../../../assets/functions.js";

const BottomControlllPLayIng = React.memo(() => {
   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong);
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId);
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent);
   const currentTime = useSelector((state) => state.queueNowPlay.currentTime);
   const settings = useSelector((state) => state.setting);
   const playlist = useSelector((state) => state.logged);
   const [oke, setOke] = useState(false);
   const dispatch = useDispatch();
   const progressBar = useRef();
   const progresArea = useRef();
   const audioRef = useRef();

   const setTimeSong1 = useCallback((e) => {
      let res = (e.nativeEvent.offsetX / progresArea.current.clientWidth) * infoSongCurrent?.duration;
      progressBar.current.style.width = (res / infoSongCurrent?.duration) * 100 + "%";
      dispatch(setCurrentTime(res));
      audioRef.current.seekTo(res);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [progresArea, infoSongCurrent, progressBar]);
   useEffect(() => {
      const setOff = () => dispatch(setPlay(false));
      window.addEventListener("beforeunload", setOff());
      return () => window.removeEventListener("beforeunload", setOff());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   useLayoutEffect(() => {
      progressBar.current.style.width = (currentTime / infoSongCurrent?.duration) * 100 + "%";
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentTime]);
   return (
      <div className="player_bottom">
         <p className="playing_time-left">{fancyTimeFormat(currentTime)}</p>
         <div onClick={setTimeSong1} ref={progresArea} className="playing_time-up2 progress-area">
            <div ref={progressBar} className="progress-bar" />
            <ReactPlayer
               width={0}
               height={0}
               ref={audioRef}
               progressInterval={settings.progressInterval}
               config={{ file: { forceAudio: true } }}
               onReady={(e) => {
                  dispatch(setReady(true));
                  // save local
                  if (!oke && currentTime !== 0) {
                     audioRef.current.seekTo(currentTime);
                     setOke(true);
                  };
                  dispatch(pushSongsLogged(infoSongCurrent));
               }}
               onProgress={(e) => dispatch(setCurrentTime(e.playedSeconds))}
               onEnded={() => {
                  // Kiểm tra xem có kích thước mảng bài hát lớn hơn 1 không để xác định có bài hát tiếp theo không
                  if (!settings.isLoop && playlist.recentSongs.length > 1) {
                     // Nếu không đang bật chế độ lặp và có nhiều hơn 1 bài hát trong danh sách
                     if (settings.isRandom) {
                        dispatch(setCurrentIndexSongShuffle(currentIndexSong + 1)); // Nếu đang ở chế độ phát ngẫu nhiên
                     } else { 
                        dispatch(setCurrentIndexSong(currentIndexSong + 1)); // Nếu đang ở chế độ phát tuần tự
                     };
                     dispatch(setReady(false)); // Đặt trạng thái sẵn sàng về false để chuẩn bị phát bài hát mới
                     if (!settings.playing) {
                        dispatch(setPlay(true)); // Nếu đang tắt chế độ phát, bật chế độ phát
                     };
                  };
               }}
               onError={(err) => {
                  // Check nếu có bài hát tiếp theo trong danh sách
                  if (playlist.recentSongs.length - 1) {
                     setTimeout(() => {
                        dispatch(setCurrentIndexSong(currentIndexSong + 1));
                        dispatch(setPlay(true));
                     }, 1000); // đổi bài hát và tiếp tục phát sau 1 giây
                  } else {
                     // Nếu không có bài hát tiếp theo, quay lại bài hát đầu tiên
                     dispatch(setCurrentIndexSong(0));
                     // rồi phát bài hát đầu tiên đó
                     dispatch(setPlay(true));
                  };
                  toast.error("Không thể phát bài hát này, vui lòng thử lại sau...");
               }}
               playing={settings.playing}
               loop={settings.isLoop}
               volume={settings.volume}
               muted={settings.muted}
               url={currentEncodeId ? `http://api.mp3.zing.vn/api/streaming/audio/${currentEncodeId}/320` : ""}
            />
         </div>
         <p className="playing_time-right">{fancyTimeFormat(infoSongCurrent?.duration)}</p>
      </div>
   );
});

export default BottomControlllPLayIng;