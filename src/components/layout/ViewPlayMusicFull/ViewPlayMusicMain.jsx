/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useRef, memo, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffClass, setOffMain } from "../../../assets/redux/Features/openMainFullFeatures.js";
import { fetchDataLyrics } from "../../../assets/redux/Features/LyricsFeatures.js";
import BgFullListMusic from "./BgFullListMusic";
import BgFullKaroke from "./BgFullKaroke";
import BgFullLyrics from "./BgFullLyrics";
import BgSwiperFull from "./BgSwiperFull";
import BtnSetting from "./BtnSetting";

const ViewPlayMusicMain = memo(() => {
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent);
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId);
   const infoCurrenAlbum = useSelector((state) => state.queueNowPlay.infoCurrenAlbum);
   const isBgFull = useSelector((state) => state.setting.isBgFull);
   const [isScroll, setIsScroll] = useState(false);
   const [open, setOpen] = useState(1);
   const dispatch = useDispatch();
   const bottomRef = useRef();
   // fetch lyric
   useLayoutEffect(() => {
      dispatch(fetchDataLyrics(currentEncodeId));
   }, [currentEncodeId]);
   // hidden
   useLayoutEffect(() => {
      const playingBar = document.querySelector(".playing-bar");
      var timeout;
      const hidden = () => {
         clearTimeout(timeout);
         timeout = setTimeout(function() {
            setTimeout(() => {
               setIsScroll(true);
               playingBar.classList.add("play_hidden");
            }, 500);
         }, 7000);
         playingBar.classList.remove("play_hidden");
         setIsScroll(false);
      };
      document.addEventListener("mousemove", hidden);
      return () => document.removeEventListener("mousemove", hidden);
   }, []);

   // Toggle full screen
   const toggleFullScreen = useCallback(() => {
      const btn = document.querySelector(".nowplaying-header_setting-btn.full");
      if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
         btn.classList.add("active")
         if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
         } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
         } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
         };
      } else {
         btn.classList.remove("active")
         if (document.cancelFullScreen) {
            document.cancelFullScreen();
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
         };
      };
   }, []);

   return (
      <div className="nowplaying text white">
         <div className="nowplaying-bg">
            <div className={`nowplaying-overlay ${isBgFull ? "opacity-20" : ""}`} />
            {isBgFull ? <BgSwiperFull /> : <img src={infoSongCurrent.thumbnailM} alt="" />}
         </div>
         <div className="nowplaying-content">
            <div className="nowplaying-header">
               <div className="nowplaying-header_left">
                  <div className="info">
                     <div className="logo">
                        <img src="/avatarMain.png" alt="" />
                     </div>
                     <div className="info-text !">
                        <p>Từ PlayLits</p>
                        <p id="titleList">{infoCurrenAlbum.title}</p>
                     </div>
                  </div>
               </div>
               <ul className="nowplaying-header_tab">
                  <li onClick={() => setOpen(1)} className={`nowplaying-header_tab-item ${open === 1 ? "active" : ""}`}>
                     Danh sách phát
                  </li>
                  <li onClick={() => setOpen(2)} className={`nowplaying-header_tab-item ${open === 2 ? "active" : ""}`}>
                     Karaoke
                  </li>
                  <li onClick={() => setOpen(3)} id="full-lyrics" className={`nowplaying-header_tab-item  ${open === 3 ? "active" : ""}`}>
                     Lời bài hát
                  </li>
               </ul>
               <div className="nowplaying-header_setting" style={{ display: "flex" }}>
                  <div className="nowplaying-header_setting-item">
                     <button onClick={toggleFullScreen} className="nowplaying-header_setting-btn full ">
                        <span className="material-icons-outlined btn-top">open_in_full</span>
                        <span className="material-icons-outlined btn-bottom">close_fullscreen</span>
                     </button>
                  </div>
                  <BtnSetting/>
                  <div className="nowplaying-header_setting-item">
                     <button
                        onClick={() => {
                           dispatch(setOffClass())
                           setTimeout(() => dispatch(setOffMain()), 600);
                        }}
                        className="nowplaying-header_setting-btn down"
                     >
                        <span className="material-icons-outlined">keyboard_arrow_down</span>
                     </button>
                  </div>
               </div>
            </div>
            <div className="nowplaying-body">
               {open === 1 && <BgFullListMusic isScroll={isScroll} />}
               {open === 2 && <BgFullKaroke />}
               {open === 3 && <BgFullLyrics />}
            </div>
            <div className="nowplaying-bottom">
               <div className={`zm-text-transition  ${bottomRef?.current?.innerText?.length > 70 ? " is-transition" : ""} flex items-center justify-center`}>
                  <div
                     ref={bottomRef}
                     className={`zm-text-transition-item  ${bottomRef?.current?.innerText?.length > 70 ? "transition-content" : ""}`}
                  >
                     {infoSongCurrent.title} -{" "}
                     <span className="artist">
                        {infoSongCurrent.artists && infoSongCurrent.artists?.map((e, index) => {
                           let prara = ", ";
                           if (index === infoSongCurrent.artists.length - 1) {
                              prara = "";
                           };
                           return (
                              <span key={index}>
                                 <span className="is-ghost">{e.name}</span>
                                 {prara}
                              </span>
                           )
                        })}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
});

export default ViewPlayMusicMain;