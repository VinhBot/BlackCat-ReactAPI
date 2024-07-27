import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { setPlayingAction } from "../assets/redux/Features/settingPlayFeatures.js";
import { setOpenOff } from "../assets/redux/Features/toggleMainMvFeatures.js";
import { pushMvsLogged } from "../assets/redux/Features/loggedFeatures.js";
import PlayListSelector from "../components/Selection/PlayListSelector.jsx";
import VideoPlayItems from "../components/VideoMv/VideoPlayItems.jsx";
import { LoadingSvg } from "../components/loading/LoadingSvg.jsx";
import MvDataList from "../components/MVpage/MvDataList.jsx";
import { AxiosAPI } from "../assets/api.js";
import { scrollTop } from "../assets/functions.js";

const VideoPopUp = () => {
   const { id } = useParams();
   const [datas, setData] = useState([]);
   const clipRef = useRef();
   const dispatch = useDispatch();
   const navigator = useNavigate();
   const idOpen = useSelector((state) => state.setOpenMainMv.historyOpen)
   const infoCurrentMv = useSelector((state) => state.queueNowPlay.infoCurrentMv)
   const fetchData = useCallback(async () => {
      const data = await AxiosAPI.getVideoMv(id);
      if (datas.length === 0 || !datas) {
         setData(data);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   const handleClose = useCallback(() => {
      let video = document.querySelector("#video-react video");
      video.pause();
      navigator(`${idOpen}`);
      dispatch(setOpenOff());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   useEffect(() => {
      document.getElementById("scrollableDiv").style.zIndex = "120";
      return () => {
         document.getElementById("scrollableDiv").style.zIndex = "1";
      };
   }, []);
   useLayoutEffect(() => {
      scrollTop();
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id])
   useLayoutEffect(() => {
      dispatch(setPlayingAction(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   if (datas?.length === 0 || !datas) return (
      <div className="zm-video-modal is-loading">
         <div className="relative w-full h-full">
            <div className="mv_play-main">
               <LoadingSvg />
            </div>
         </div>
      </div>
   );

   return (
      <div className="zm-video-modal">
         <div className="relative w-full h-full">
            <div className="mv_play-main">
               <div className="video-wrapper h-full relative">
                  <div className="cover-bg" style={{ backgroundImage: `url("${datas?.thumbnailM || null}")` }} />
                  <div className="blur-bg"/>
                  <div className="video-container pt-3">
                     <div className="w-[95vw] mx-auto">
                        <div className="video_header flex items-center justify-between w-full">
                           <div className="video_header-favourite flex items-center gap-[16px]">
                              <div className="video_header-left mr-[10px]">
                                 <div className="todaychoice_list-item-title">
                                    <div className="main_mv-avatr">
                                       <img src={datas?.artists[0].thumbnail || datas?.artists[0].thumbnailM} alt="Preview Avatar" />
                                    </div>
                                    <div className="main_mv-info-title">
                                       <div className="main_title-text" href="#">
                                          {datas?.title}
                                       </div>
                                       <div className="main_subtitle">
                                          {datas?.artists.map((e, index) => {
                                             let prara = ", ";
                                             if (index === datas.artists.length - 1) {
                                                prara = ".";
                                             };
                                             return (
                                                <span key={index}>
                                                   <Link to={`/nghe-si/${e.alias}/`}>{e.name}</Link>
                                                   {prara}
                                                </span>
                                             );
                                          })}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="video_header-right flex-nowrap flex">
                                 <button className="zm-btn zm-tooltip-btn is-hover-circle button" tabIndex={0}>
                                    <i className="icon ic-like" />
                                 </button>
                                 <button className="zm-btn zm-tooltip-btn is-hover-circle button" tabIndex={0}>
                                    <i className="icon ic-more" />
                                 </button>
                              </div>
                           </div>
                           <div className="video_header-close flex items-center gap-[16px]">
                              <div className="video_header-right">
                                 <button className="btn-minimize zm-btn zm-tooltip-btn is-hover-circle button" tabIndex={0}>
                                    <i className="icon ic-minimize"></i>
                                 </button>
                                 <button onClick={() => handleClose()} className="zm-btn zm-tooltip-btn is-hover-circle button" tabIndex={0}>
                                    <i className="icon ic-close"></i>
                                 </button>
                              </div>
                           </div>
                        </div>
                        <div className="video_body mt-[10px]">
                           <div className="video-playing flex gap-[30px]">
                              <div className=" video-player  w-full relative">
                                 <div className="player-wrapper relative border-none overflow-hidden rounded-xl ">
                                    <ReactPlayer
                                       url={Object.values(datas.streaming.mp4)[2] || Object.values(datas.streaming.mp4)[1] || Object.values(datas.streaming.mp4)[0] || ""}
                                       id="video-react"
                                       className="react-player outline-none border-none"
                                       width="100%"
                                       ref={clipRef}
                                       playing
                                       height="100%"
                                       controls
                                       onReady={() => dispatch(pushMvsLogged(infoCurrentMv))}
                                    />
                                 </div>
                              </div>
                              <div className="video-queuer">
                                 <div className="video-queue rounded-xl h-full overflow-auto max-h-full">
                                    <div className="video-queue-list p-[1.6rem]">
                                       <PlayListSelector classAdd={"!mt-0"} title="Danh Sách Phát">
                                          {datas.recommends.map((e) => <VideoPlayItems key={e.encodeId} data={e} />)}
                                       </PlayListSelector>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="video-recommend">
                        <div className="video-footer ">
                           <div className="main_mv main-page-item active">
                              <div className="main_mv-container ">
                                 {datas?.artists?.map((e, index) => <MvDataList key={index} item={e} />)}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default VideoPopUp;
