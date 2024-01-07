import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pushPlayListsLogged } from "../../assets/redux/Features/loggedFeatures.js";
import { fetchPlayList, playSongNotAlbum, playSongNotAlbumById } from "../../assets/redux/Features/QueueFeatures.js";
import { setPlay, setReady } from "../../assets/redux/Features/settingPlayFeatures.js";
import { OutstandingItemsStyles } from "../../assets/styledComponents";

const OutstandingItems = memo(({ data, classGrid, type, isSearch, setOpen }) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   if (isSearch) {
      return (
         <OutstandingItemsStyles className={`${classGrid || null} ${isSearch ? "is-item-search" : null} media-hover`}>
            <div
               onClick={() => {
                  if (data?.type === 4) {
                     navigate(`/nghe-si/${data?.aliasName}`)
                     setOpen(false)
                  }

                  if (data?.type === 1) {
                     dispatch(setReady(false))
                     dispatch(setPlay(false))
                     dispatch(playSongNotAlbumById(data))
                     dispatch(setPlay(true))
                     setOpen(false)
                  }
               }}
               className="media artist-item "
            >
               <div className="media-left mr-[10px]">
                  {isSearch && (
                     <div
                        className={`${
                           isSearch ? "w-[50px] h-[50px]" : "w-[80px] h-[80px]"
                        } want_list-item-link main-page_list-item main_page-hover`}
                     >
                        <div className="want_list-item-link  cursor-pointer main-page_list-item_img">
                           <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                        </div>

                        {data?.type !== 4 && (
                           <div className="recently_list-item_hover ">
                              <div className="recently_btn-hover recently_btn-hover-play">
                                 <span>
                                    <i className="icon ic-play"></i>
                                 </span>
                              </div>
                           </div>
                        )}
                     </div>
                  )}
               </div>
               <div className="media-right overflow-hidden">
                  <p className="type">{type}</p>
                  {data?.type === 4 && (
                     <>
                        <div className="title ">
                           <div className="is-ghost" to={`/nghe-si${data?.link}`}>
                              <span>{data?.name}</span>
                           </div>
                        </div>
                        <div className="subtitle">
                           <span className="followers">
                              Nghệ sĩ •{" "}
                              {data?.followers > 1000000
                                 ? data?.followers.toString().slice(0, -6) + "M"
                                 : data?.followers > 10000
                                 ? data?.followers.toString().slice(0, -3) + "K"
                                 : data.followers}{" "}
                              quan tâm
                           </span>
                        </div>
                     </>
                  )}

                  {data?.type === 1 && (
                     <>
                        <div className="title ">
                           <div to={`/alubm/${data?.encodeId}`}>
                              <span>{data?.title}</span>
                           </div>
                        </div>

                        <h3 className=" is-truncate subtitle ">
                           {data?.artists &&
                              data?.artists?.slice(0, 3)?.map((e, index) => {
                                 let prara = ", "

                                 if (index === 2) {
                                    prara = "..."
                                 }

                                 if (data?.artists.length === 1) {
                                    prara = ""
                                 }
                                 if (data?.artists.length === 2 && index === 1) {
                                    prara = ""
                                 }
                                 if (data?.artists.length === 3 && index === 2) {
                                    prara = ""
                                 }

                                 return (
                                    <span key={index}>
                                       <span to={`/nghe-si/${e.alias}/`}>{e.name}</span>
                                       {prara}
                                    </span>
                                 )
                              })}
                        </h3>
                     </>
                  )}
               </div>
            </div>
         </OutstandingItemsStyles>
      )
   }

   let typeLink

   if (type === "Nghệ sĩ") {
      typeLink = `/nghe-si${data?.link}/`
   }

   if (type === "Playlist") {
      typeLink = `/album/${data?.playlistId}`
   }

   if (type === "Bài Hát") {
      typeLink = `/album/${data?.playlistId}`
   }

   return (
      <OutstandingItemsStyles className={`${classGrid || null} ${isSearch ? "is-item-search" : null} media-hover`}>
         <div to={typeLink || "/"} className="media artist-item  cursor-pointer">
            <div
               onClick={() => {
                  if (type === "Nghệ sĩ") {
                     dispatch(setReady(false))
                     dispatch(setPlay(false))
                     dispatch(fetchPlayList(data?.playlistId))
                     dispatch(setPlay(true))
                  }
                  if (type === "Playlist") {
                     navigate(`/album/${data?.encodeId}`)
                     dispatch(setReady(false))
                     dispatch(setPlay(false))
                     dispatch(fetchPlayList(data?.encodeId))
                     dispatch(setPlay(true))
                     if (data.textType === "Playlist") {
                        dispatch(pushPlayListsLogged(data))
                     }
                  }
                  if (type === "Bài Hát") {
                     dispatch(setReady(false))
                     dispatch(setPlay(false))
                     dispatch(playSongNotAlbum(data))
                     dispatch(setPlay(true))
                  }
               }}
               className="media-left mr-[20px]"
            >
               {type === "Nghệ sĩ" && (
                  <div
                     className={`${
                        isSearch ? "w-[50px] h-[50px]" : "w-[80px] h-[80px]"
                     } want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
                  >
                     <div className="want_list-item-link main-page_list-item_img">
                        <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                     </div>

                     <div className="recently_list-item_hover ">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           <span>
                              <i className="icon action-play ic-24-Shuffle"></i>
                           </span>
                        </div>
                     </div>
                  </div>
               )}
               {type !== "Nghệ sĩ" && !isSearch && (
                  <div
                     // to={`/album/${data?.encodeId}`}
                     className={`${
                        isSearch ? "w-[40px] h-[40px]" : "w-[80px] h-[80px]"
                     } want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
                  >
                     <div className="want_list-item-link main-page_list-item_img">
                        <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                     </div>

                     <div className="recently_list-item_hover ">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           <span>
                              <i className="icon ic-play"></i>
                           </span>
                        </div>
                     </div>
                  </div>
               )}
               {isSearch && (
                  <div
                     className={`${
                        isSearch ? "w-[40px] h-[40px]" : "w-[80px] h-[80px]"
                     } want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
                  >
                     <div className="want_list-item-link main-page_list-item_img">
                        <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                     </div>

                     <div className="recently_list-item_hover ">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           <span>
                              <i className="icon ic-play"></i>
                           </span>
                        </div>
                     </div>
                  </div>
               )}
            </div>
            <div className="media-right overflow-hidden ml-[6px]">
               <p className="type">{type}</p>
               {type === "Nghệ sĩ" && (
                  <>
                     <div className="title title-hover">
                        <div
                           className="is-ghost"
                           //  to={`/nghe-si${data?.link}`}
                        >
                           <span>{data?.name}</span>
                        </div>
                     </div>
                     <div className="subtitle">
                        <span className="followers">
                           {data?.totalFollow > 1000000
                              ? data?.totalFollow.toString().slice(0, -6) + "M"
                              : data?.totalFollow > 10000
                              ? data?.totalFollow.toString().slice(0, -3) + "K"
                              : data.totalFollow}{" "}
                           quan tâm
                        </span>
                     </div>
                  </>
               )}

               {type !== "Nghệ sĩ" && (
                  <>
                     <div className="title title-hover">
                        <div className="is-ghost" to={`/alubm/${data?.encodeId}`}>
                           <span>{data?.title}</span>
                        </div>
                     </div>

                     <h3 className="is-one-line is-truncate subtitle ">
                        {data?.artists &&
                           data?.artists?.slice(0, 3)?.map((e, index) => {
                              let prara = ", "

                              if (index === 2) {
                                 prara = "..."
                              }

                              if (data?.artists.length === 1) {
                                 prara = ""
                              }
                              if (data?.artists.length === 2 && index === 1) {
                                 prara = ""
                              }
                              if (data?.artists.length === 3 && index === 2) {
                                 prara = ""
                              }

                              return (
                                 <span key={index}>
                                    <span className="is-ghost" to={`/nghe-si/${e.alias}/`}>
                                       {e.name}
                                    </span>
                                    {prara}
                                 </span>
                              )
                           })}
                     </h3>
                  </>
               )}
            </div>
         </div>
      </OutstandingItemsStyles>
   )
})

export default OutstandingItems
