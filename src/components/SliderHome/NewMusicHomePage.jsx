import { Navigation, Autoplay, Pagination } from "swiper/modules";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { playSongNotAlbum } from "../../assets/redux/Features/QueueFeatures.js";
import { setPlay, setReady } from "../../assets/redux/Features/settingPlayFeatures.js";
import PlayListSelector from "../Selection/PlayListSelector";
import { AxiosAPI } from "../../assets/api.js";
import LoadingIcon from "../Icon/LoadingIcon";
import ActionIcon from "../Icon/ActionIcon";

const NewMusicHomePage = memo(() => {
   const { data, status } = AxiosAPI.useGetHomePage();
   const [datas, setData] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId);
   const { playing, isReady } = useSelector((state) => state.setting);

   const dataSelector = data?.data.items.find((e) => e.sectionId === "hAlbum");

   useEffect(() => {
      if(data) {
         setData(dataSelector?.items);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [status]);

   const navigationPrevRef = React.useRef(null);
   const navigationNextRef = React.useRef(null);

   try {
      return (
         <PlayListSelector to="moi-phat-hanh" classAdd={`container_release`} title={dataSelector?.title} all={true}>
            <div className="release_list">
               {datas && datas.length > 0 && (
                  <Swiper
                     modules={[Navigation, Autoplay, Pagination]}
                     autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                     }}
                     loop={true}
                     slidesPerView={3}
                     slidesPerGroup={1}
                     pagination={{
                        dynamicBullets: true,
                     }}
                     navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                     }}
                     onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = navigationPrevRef.current
                        swiper.params.navigation.nextEl = navigationNextRef.current
                     }}
                     speed={600}
                     allowTouchMove={false}
                     scrollbar={{ draggable: false }}
                     breakpoints={{
                        100: {
                           slidesPerView: 1,
                           allowTouchMove: true,
                        },
                        650: {
                           allowTouchMove: true,
                           slidesPerView: 2,
                           slidesPerGroup: 2,
                        },
                        1220: {
                           slidesPerView: 3,
                           slidesPerGroup: 3,
                        },
                     }}
                  >
                     {datas.map((e, index) => {
                        const { title, encodeId, artists, thumbnailM, album } = e;
                        let active = e?.encodeId === currentEncodeId;

                        return (
                           <SwiperSlide key={encodeId}>
                              <div className="release_list-item">
                                 <div className="release_list-item-left main-page_list-item_img main_page-hover">
                                    <div className="release_list-item-img">
                                       <img src={thumbnailM} alt={title} />
                                    </div>
                                    <div
                                       onClick={(e) => {
                                          if(e.target.className.includes("recently_list-item_hover")) {
                                             navigate("moi-phat-hanh")
                                          }
                                       }}
                                       className="recently_list-item_hover"
                                    >
                                       <div className="recently_btn-hover recently_btn-hover-play">
                                          {active && (
                                             <>
                                                {isReady && (
                                                   <>
                                                      {!playing && (
                                                         <span onClick={() => dispatch(setPlay(true))}>
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

                                                {!isReady && <LoadingIcon notLoading></LoadingIcon>}
                                             </>
                                          )}
                                          {!active && (
                                             <span
                                                onClick={() => {
                                                   const hi = async () => {
                                                      dispatch(setReady(false))
                                                      dispatch(setPlay(false))
                                                      await dispatch(playSongNotAlbum(e))
                                                      dispatch(setPlay(true))
                                                   }
                                                   hi()
                                                }}
                                             >
                                                <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                                             </span>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="release_list-item-right">
                                    <div className="release_list-item-right-top">
                                       <div className="main_title-text">{title}</div>
                                       <div className="main_subtitle">
                                          {artists &&
                                             artists?.slice(0, 3)?.map((e, index) => {
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
                                                      <Link to={"/"}>{e.name}</Link>
                                                      {prara}
                                                   </span>
                                                )
                                             })}
                                       </div>
                                    </div>
                                    <div className="release_list-item-right-bottom">
                                       <div className="release_list-item-chart">#{index + 1}</div>
                                       <div className="release_list-item-date">{album?.releaseDate}</div>
                                    </div>
                                 </div>
                              </div>
                           </SwiperSlide>
                        )
                     })}

                     {/* <SwiperSlide>
                        <div className="release_list-item flex items-center justify-center h-[152px] ">
                           <span>Xem Tất Cả</span>
                        </div>
                     </SwiperSlide> */}
                     <>
                        <button ref={navigationPrevRef} type="button" className="release-btn-left slick-prev slick-arrow">
                           <span span="" className="material-icons-outlined">
                              arrow_back_ios
                           </span>
                        </button>
                        <button ref={navigationNextRef} type="button" className="release-btn-right slick-next slick-arrow">
                           <span className="material-icons-outlined">arrow_forward_ios</span>
                        </button>
                     </>
                  </Swiper>
               )}
            </div>
         </PlayListSelector>
      )
   } catch (error) {
      console.log(error)
   }
})

export default NewMusicHomePage
