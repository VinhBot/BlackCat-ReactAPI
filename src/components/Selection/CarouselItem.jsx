import { Link, useNavigate } from "react-router-dom";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchPlayList } from "../../assets/redux/Features/QueueFeatures.js"
import ActionIcon from "../Icon/ActionIcon"
import { setPlay, setReady } from "../../assets/redux/Features/settingPlayFeatures.js"
import { pushPlayListsLogged } from "../../assets/redux/Features/loggedFeatures.js"
import { useLikeHook } from "../layout/Hook"
import { StyleDiv } from "../../assets/styledComponents";

const CarouselItem = memo(({ hiddenTitle, isHiddenButton = false, isSwiper = false, class1 = "", class2 = "", artis = false, desc = false, item = {}}) => {
      const { title, encodeId, artists, sortDescription, thumbnailM } = item;
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const playlistEncodeId = useSelector((state) => state.queueNowPlay.playlistEncodeId);
      const { playing } = useSelector((state) => state.setting);
      let active = playlistEncodeId === encodeId;

      const { isLike, handleLike } = useLikeHook(item, 1);

      return (
         <StyleDiv className={` ${active ? "active" : ""} ${class1}`} title={sortDescription}>
            <div
               onClick={(e) => {
                  if(e.target.className.includes("recently_list-item_hover")) {
                     navigate(`/album/${encodeId}`)
                  }
               }}
               className={`${class2}want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
            >
               <div className="want_list-item-link main-page_list-item_img">
                  <img src={thumbnailM || item.thumbnail} alt={title} />
               </div>
               {!isHiddenButton && (
                  <div className="recently_list-item_hover ">
                     <div onClick={handleLike} className="recently_btn-hover player_btn like">
                        <i className={`icon  ${isLike ? "ic-like-full" : "ic-like"} `}></i>
                        <span className="playing_title-hover"> {isLike ? " Xóa khỏi " : "Thêm vào"} thư viện </span>
                     </div>

                     <div className="recently_btn-hover recently_btn-hover-play">
                        <span>
                           {active && (
                              <>
                                 {!playing && (
                                    <span
                                       className="playlist"
                                       onClick={(e) => {
                                          dispatch(setPlay(true))
                                       }}
                                    >
                                       <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                                    </span>
                                 )}
                                 {playing && (
                                    <span onClick={() => dispatch(setPlay(false))}>
                                       <ActionIcon></ActionIcon>
                                    </span>
                                 )}
                              </>
                           )}
                           {!active && (
                              <span
                                 onClick={async() => {
                                    navigate(`/album/${encodeId}`)
                                    dispatch(setReady(false))
                                    dispatch(setPlay(false))
                                    await dispatch(fetchPlayList(encodeId))
                                    dispatch(setPlay(true))
                                    if (item.textType === "Playlist") {
                                       dispatch(pushPlayListsLogged(item))
                                    }
                                 }}
                              >
                                 <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                              </span>
                           )}
                        </span>
                     </div>
                     <div className="recently_btn-hover player_btn">
                        <span className="material-icons-outlined "> more_horiz </span>
                        <span className="playing_title-hover">Xem thêm</span>
                     </div>
                  </div>
               )}
            </div>
            {!hiddenTitle && (
               <div className="want_list-item-title">
                  <Link to={`/album/${encodeId}`} className="main_title-text">
                     {title}
                  </Link>
                  <div className="main_subtitle">
                     {artis && (
                        <>
                           {artists && artists?.slice(0, 3)?.map((e, index) => {
                                 let prara = ", "
                                 if (index === 2) {
                                    prara = "..."
                                 }

                                 if (artists.length === 1) {
                                    prara = ""
                                 }
                                 if (artists.length === 2 && index === 1) {
                                    prara = ""
                                 }
                                 if (artists.length === 3 && index === 2) {
                                    prara = ""
                                 }

                                 return (
                                    <span key={index}>
                                       <Link to={`/nghe-si/${e.alias}/`}>{e.name}</Link>
                                       {prara}
                                    </span>
                                 )
                              })}
                        </>
                     )}
                     {desc && <p>{sortDescription}</p>}
                  </div>
               </div>
            )}
         </StyleDiv>
      )
   }
)



const Loading = ({ class1 = "", class2 = "", artis = false, desc = false }) => {
   const LoadingSkeleton = ({ className }) => {
      return <div className={`skeleton ${className}`} />
   };
   return (
      <div className={` ${class1}`}>
         <div className={`${class2}want_list-item-link cursor-pointer main-page_list-item main_page-hover`}>
            <div className="want_list-item-link main-page_list-item_img w-full">
               <LoadingSkeleton className="w-full h-[225px]"></LoadingSkeleton>
            </div>
         </div>
         <div className="want_list-item-title">
            <div className="main_title-text">
               <LoadingSkeleton className="h-[14px] w-3/4 rounded-sm"></LoadingSkeleton>
            </div>
            <div className="main_subtitle">
               <LoadingSkeleton className="h-[12px] w-2/3 "></LoadingSkeleton>
            </div>
         </div>
      </div>
   );
};

CarouselItem.Loading = Loading;

export default CarouselItem;
