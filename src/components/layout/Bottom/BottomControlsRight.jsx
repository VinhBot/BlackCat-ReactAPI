import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { setIsVolume, setVolume, toogleMuted } from "../../../assets/redux/Features/settingPlayFeatures.js";
import { setOpenClass, setOpenMain } from "../../../assets/redux/Features/openMainFullFeatures.js";
import { setToggle } from "../../../assets/redux/Features/toggleRightFeatures.js";

const BottomControlsRight = () => {
   const infoSong = useSelector((state) => state.queueNowPlay.infoSongCurrent); // Lấy thông tin bài hát hiện tại từ Redux store
   const isToggle = useSelector((state) => state.toggleright); // Lấy trạng thái toggle của sidebar bên phải
   const setting = useSelector((state) => state.setting); // Lấy các cài đặt liên quan đến âm lượng
   const dispatch = useDispatch(); // Tạo dispatch function để gửi các action
   const volumeRef = useRef(); // Tạo ref để tham chiếu đến input volume

   const linkMv = infoSong?.mvlink; // Lấy link MV từ thông tin bài hát hiện tại
   const idMv = linkMv ? linkMv.split('/').pop().slice(0, -5) : ''; // Tách ID của MV từ link MV

   useEffect(() => {
      const x = setting.volume * 100; // Chuyển đổi giá trị âm lượng thành phần trăm
      volumeRef.current.style.background = `linear-gradient(90deg, var(--progressbar-active-bg) ${x}%, var(--progressbar-player-bg) ${x}%)`; // Cập nhật màu nền của input volume
   }, [setting.volume]); // Chỉ thực hiện lại khi setting.volume thay đổi

   useEffect(() => {
      const playbar = document.querySelector(".playing-bar"); // Tìm phần tử playing-bar trong DOM
      const header = document.querySelector(".header"); // Tìm phần tử header trong DOM
      header.style.zIndex = 112; // Đặt z-index của header lên 112
      playbar.style.zIndex = 113; // Đặt z-index của playbar lên 113
      return () => {
         header.style.zIndex = null; // Reset z-index của header khi component unmount
         playbar.style.zIndex = null; // Reset z-index của playbar khi component unmount
      };
   }, [isToggle]); // Chỉ thực hiện lại khi isToggle thay đổi
   const handleVolumeClick = () => {
      dispatch(toogleMuted()); // Dispatch action để toggle muted
      dispatch(setVolume(setting.muted ? setting.isVolume : 0)); // Nếu muted, set volume về giá trị trước đó, nếu không thì set volume về 0
   };
   const handleVolumeChange = (e) => {
      const volume = e.target.value / 100; // Chuyển đổi giá trị input volume từ phần trăm về thập phân
      dispatch(setVolume(volume)); // Dispatch action để cập nhật volume
      dispatch(setIsVolume(volume)); // Dispatch action để cập nhật trạng thái volume
   };
   const handleKaraokeClick = () => {
      dispatch(setOpenMain()); // Dispatch action để mở main view
      setTimeout(() => {
         dispatch(setOpenClass()); // Dispatch action để mở class view sau một khoảng thời gian ngắn
         document.getElementById("full-lyrics").click(); // Tự động click vào phần tử có ID "full-lyrics"
      }, 100); // Đặt thời gian chờ là 100ms
   };

   return (
      <div className="player_controls-right">
         <Link to={`/video-clip/${idMv}`} className={`player_btn playing_mv ${linkMv ? "" : "disabled"}`}>
            <i className="icon ic-mv"></i>
            <div className="playing_title-hover">Xem MV</div>
         </Link>
         <div onClick={handleKaraokeClick} className="player_btn playing_karaoke">
            <i className="icon ic-karaoke"></i>
            <div className="playing_title-hover">Xem Lời bài hát</div>
         </div>
         <div className="player_volume playing_volume">
            <div onClick={handleVolumeClick} className="player_btn">
               <i className={`icon ${setting.muted ? "ic-volume-mute" : "ic-volume"}`}></i>
            </div>
            <div className="playing_volume-input">
               <input ref={volumeRef} className="transition-all" id="inputVolume" type="range" min={0} max={100} value={setting.volume * 100} onChange={handleVolumeChange} />
            </div>
         </div>
         <div className="player_device-column" />
         <div onClick={() => dispatch(setToggle())} className={`toggle-right ${isToggle ? "active" : ""}`}>
            <div className="zm-btn">
               <i className="icon ic-list-music"></i>
               <div className="playing_title-hover">Danh sách phát</div>
            </div>
         </div>
      </div>
   );
};

export default BottomControlsRight;
