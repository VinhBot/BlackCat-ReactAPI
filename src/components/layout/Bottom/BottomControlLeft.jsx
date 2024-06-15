import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useCallback } from "react";
import { setOpenClass, setOpenMain } from "../../../assets/redux/Features/openMainFullFeatures.js"
import { useLikeHook } from "../Hook.jsx";

const BottomControlLeft = () => {
   // Sử dụng useSelector để lấy ra thông tin bài hát hiện tại từ Redux store
   const infoSong = useSelector((state) => state.queueNowPlay.infoSongCurrent);
   // Sử dụng useDispatch để lấy ra hàm dispatch từ Redux
   const dispatch = useDispatch();
   // Sử dụng custom hook để xử lý logic liên quan đến việc thích bài hát
   const { isLike, handleLike } = useLikeHook(infoSong, 2);
   // Hàm render danh sách các nghệ sĩ của bài hát
   const renderArtists = useCallback(() => {
      const artists = infoSong?.artists || [];
      return artists.slice(0, 3).map((artist, index) => {
         // Xác định dấu phẩy phù hợp dựa trên số lượng nghệ sĩ và vị trí trong mảng
         let prara = (artists.length === 1 || index === 2) ? "" : ", ";
         return (
            // Hiển thị tên nghệ sĩ và tạo liên kết đến trang cá nhân của họ
            <span key={index}>
               <Link to={`/nghe-si/${artist.alias}/`}>{artist.name}</Link>
               {prara}
            </span>
         );
      });
   }, [infoSong]);

   // Hàm xử lý sự kiện mở thanh điều khiển chính và lớp nền
   const handleOpenMain = useCallback(() => {
      // Gửi các action đến Redux để mở thanh điều khiển chính và lớp nền
      dispatch(setOpenMain());
      setTimeout(() => dispatch(setOpenClass()), 100);
   }, [dispatch]);

   return (
      <div className="player_controls-left">
         <div className="player_controls-media">
            <div className="media_left">
               <img className="media-avatar" src={infoSong?.thumbnail || infoSong?.thumb} alt="" />
               <div onClick={handleOpenMain} className="media_avatar-hover openNowPlaying">
                  <span className="material-icons-outlined"> open_in_full </span>
               </div>
            </div>
            <div className="media_center">
               <div className="media_music">{infoSong?.title}</div>
               <div className="media_name">{renderArtists()}</div>
            </div>
            <div className="media_right">
               <div onClick={handleLike} className="media_right-btn player_btn">
                  <i className={`icon  ${isLike ? "ic-like-full" : "ic-like"}`}></i>
                  <span className="playing_title-hover"> {isLike ? " Xóa khỏi " : "Thêm vào"} thư viện </span>
               </div>
               <div className="media_right-btn player_btn">
                  <i className="icon ic-more"></i>
                  <span className="playing_title-hover">Xem thêm</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default BottomControlLeft;