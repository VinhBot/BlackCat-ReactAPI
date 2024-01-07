import React, { memo } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { fetchPlayList } from "../../assets/redux/Features/QueueFeatures.js"
import { setPlay, setReady } from "../../assets/redux/Features/settingPlayFeatures.js"
import { useLikeHook } from "../layout/Hook"
import { ItemAritsStyles } from "../../assets/styledComponents"


const ItemArits = memo(({ classGird, data, noneFooter, isLinkToAll }) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { isLike, handleLike } = useLikeHook(data, 3)

   return (
      <ItemAritsStyles className={`mvpage-item-arits  ${classGird}`}>
         <div
            className={`relative want_list-item-link  cursor-pointer main-page_list-item main_page-hover ${
               isLinkToAll ? "item-myArits-last" : ""
            }`}
         >
            {isLinkToAll ? (
               <Link to="/mymusic/nghe-si" className="flex w-full h-full mvpage-link-arlit items-center justify-center pb-[100%]">
                  <i className="icon ic-16-Arrow-Next-1"></i>
               </Link>
            ) : (
               <div
                  onClick={() => {
                     navigate(`/nghe-si/${data.alias}`)
                  }}
                  className="want_list-item-link shadow main-page_list-item_img !rounded-full "
               >
                  <figure>
                     <img src={data.thumbnailM || data.thumbnail} alt="" />
                  </figure>
               </div>
            )}
            {!isLinkToAll && (
               <button
                  onClick={async () => {
                     if (!data.playlistId) return

                     dispatch(setReady(false))
                     dispatch(setPlay(false))
                     await dispatch(fetchPlayList(data.playlistId))
                     dispatch(setPlay(true))
                  }}
                  className="zm-btn is-mvpage button"
                  tabIndex="0"
               >
                  <i className="icon ic-shuffle"></i>
               </button>
            )}
         </div>
         <div className="zm-card-content flex flex-col items-center mt-[12px]">
            <div className="title mb-[4px]">
               {isLinkToAll ? (
                  <Link to="/mymusic/nghe-si" className="is-ghost">
                     Xem Tất Cả
                  </Link>
               ) : (
                  <Link to={`/nghe-si/${data.alias}`} className="is-ghost">
                     {data?.name}
                  </Link>
               )}
            </div>
            {!noneFooter && (
               <>
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
                  <div className="item-mvArits-footer mt-[10px]">
                     {!isLike && (
                        <button
                           onClick={handleLike}
                           className="zm-btn is-outlined mt-[12px] mb-[15px] !flex items-center justify-center  play-btn button"
                           tabIndex="0"
                        >
                           <i className="icon ic-addfriend"></i>
                           <span>Quan Tâm</span>
                        </button>
                     )}

                     {isLike && (
                        <button
                           onClick={async () => {
                              if (!data.playlistId) return

                              dispatch(setReady(false))
                              dispatch(setPlay(false))
                              await dispatch(fetchPlayList(data.playlistId))
                              dispatch(setPlay(true))
                           }}
                           className="zm-btn is-outlined mt-[12px] mb-[15px] !flex items-center justify-center  play-btn button"
                           tabIndex="0"
                        >
                           <i className="icon ic-20-Shuffle"></i>
                           <span>GÓC NHẠC</span>
                        </button>
                     )}
                  </div>
               </>
            )}
         </div>
      </ItemAritsStyles>
   )
})

export default ItemArits
