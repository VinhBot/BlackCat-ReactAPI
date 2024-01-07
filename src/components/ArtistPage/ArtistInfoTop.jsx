import React, { memo } from "react";
import NewReleaseitem from "../NewReleaseitem/NewReleaseitem";
import usePortal from "react-cool-portal";
import { useSelector, useDispatch } from "react-redux";
import { setPlay, setReady } from "../../assets/redux/Features/settingPlayFeatures.js";
import { fetchPlayList } from "../../assets/redux/Features/QueueFeatures.js";
import { pushPlayListsLogged } from "../../assets/redux/Features/loggedFeatures.js";
import { useLikeHook } from "../layout/Hook";
import {
   PortalStyless as PortalStyle ,
   InfoTopStyles
} from "../../assets/styledComponents";

const ArtistInfoTop = memo(({ data }) => {
   const dispatch = useDispatch();
   const playlistEncodeId = useSelector((state) => state.queueNowPlay.playlistEncodeId);
   const loading = useSelector((state) => state.queueNowPlay.loading);
   const playing = useSelector((state) => state.setting.playing);
   let active = playlistEncodeId === data?.playlistId;
   const { isLike, handleLike } = useLikeHook(data, 3);
   const { Portal, show, hide } = usePortal({ defaultShow: false });
   const handleClickBackdrop = (e) => {
      const id = e.target.id;
      if(id === "theme-overlay" || id === "portal-bio-arits") hide();
   };

   return (
      <InfoTopStyles className="artist_page-title row !flex-wrap mb-[40px]">
         <div className="col l-7 m-7 c-12 artist_page-title-deital">
            <div className="artist_page-title-left artist_page-title-deital">
               <h3 className="artist-name title">{data?.name}</h3>
               <div>
                  {data?.sortBiography.length > 0 && data && (
                     <>
                        <span className="content-detail" dangerouslySetInnerHTML={{ __html: data?.sortBiography }}></span>
                        <span onClick={() => show()} className="read-more ml-2">
                           ...Xem Thêm
                        </span>
                     </>
                  )}

                  <Portal>
                     <PortalStyle>
                        <div className="zm-portal-modal theme-modal-overlay" id="theme-overlay" onClick={handleClickBackdrop}>
                           <div className="modal p-1 theme-modal  text-white">
                              <div className=" max-w-[480px] relative">
                                 <div className="w-full">
                                    <button onClick={() => hide()} id="portal-bio-arits" className="zm-btn zm-tooltip-btn close-btn is-hover-circle button" tabIndex="0">
                                       <i className="icon ic-close"></i>
                                    </button>
                                    <div className="top">
                                       <div className="cover-bg" style={{ backgroundImage: `url("${data?.thumbnailM}")` }}/>
                                       <div className="blur-bg" />
                                       <div className="top-content">
                                          <figure className="image is-48x48">
                                             <img src={data?.thumbnailM} alt="" />
                                          </figure>
                                          <h3 className="title">{data?.name}</h3>
                                       </div>
                                    </div>
                                    <div className="bio-content">
                                       <div
                                          dangerouslySetInnerHTML={{ __html: data?.biography }}
                                          className="overflow-y-auto"
                                       ></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </PortalStyle>
                  </Portal>
               </div>
               <div className="actions mt-[20px] mb-[15px] inline-flex gap-[10px] items-center justify-start">
                  <button
                     onClick={async() => {
                        if(active) {
                           if(!playing) {
                              dispatch(setPlay(true))
                           } else {
                              dispatch(setPlay(false))
                           }
                        }
                        if(!active) {
                           dispatch(setReady(false))
                           dispatch(setPlay(false))
                           await dispatch(fetchPlayList(data?.playlistId))
                           dispatch(setPlay(true))
                           if(data?.textType === "Playlist") {
                              dispatch(pushPlayListsLogged(data))
                           }
                        }
                     }}
                     className=" zm-btn mar-r-10 is-outlined active is-medium is-upper button"
                     tabIndex="0"
                  >
                     {loading && <span>Loading...</span>}
                     {!active && !loading && <span>Phát nhạc</span>}
                     {active && playing && <span>Tạm Dừng</span>}
                     {active && !playing && <span>Phát Nhạc</span>}
                  </button>
                  <button onClick={handleLike} className={`zm-btn is-outlined ${isLike ? "" : "active"}  mar-r-15 is-medium is-upper button`} tabIndex="0">
                     <span>
                        {isLike ? "ĐÃ QUAN TÂM" : "QUAN TÂM"} •{" "}
                        {data?.follow > 10000 ? data?.follow.toString().slice(0, -3) + "K" : data?.follow}
                     </span>
                  </button>
               </div>
               <NewReleaseitem item={data?.topAlbum} isArtist/>
            </div>
         </div>
         <div className="col l-5 m-5 c-12 ">
            <div className="artist_page-title-right float-right">
               <figure className="image avatar is-48x48">
                  <img src={data?.thumbnailM} alt="" />
               </figure>
            </div>
         </div>
      </InfoTopStyles>
   );
});

export default ArtistInfoTop
