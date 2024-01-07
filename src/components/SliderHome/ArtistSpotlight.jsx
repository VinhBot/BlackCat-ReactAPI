import { Navigation, Autoplay, Pagination } from "swiper/modules";
import React, { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom"

const dataAritsHomePage = [
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/justatee.png", linkTo: "JustaTee" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/huong-ly.png", linkTo: "Huong-Ly" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/karik.png", linkTo: "Karik" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/mr-siro.png", linkTo: "mrsiro" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/trinh-thanh-binh.png", linkTo: "trinhthangbinh" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/jack.png", linkTo: "Trinh-Tran-Phuong-Tuan" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/erik.png", linkTo: "ERIK" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/duc-phuc.png", linkTo: "Duc-Phuc" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/chi-dan.png", linkTo: "chidan" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/hoa-minzy.png", linkTo: "Hoa-Minzy" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/onlyc.png", linkTo: "OnlyC" },
   { img: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/huong-ly.png", linkTo: "Nguyen-Huong-Ly" },
];

const ArtistSpotlight = memo(() => {
   const [datas, setData] = useState(null);
   const navigate = useNavigate();
   useEffect(() => {
      if(!datas) {
        setData(dataAritsHomePage);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   const navigationPrevRef = React.useRef(null);
   const navigationNextRef = React.useRef(null);
   try {
      return (
         <div className="container_choice">
            <div className="choice_list">
               {datas && datas.length > 0 && (
                  <Swiper
                     modules={[Navigation, Autoplay, Pagination]}
                     autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                     }}
                     lazy="true"
                     loopfillgroupwithblank="true"
                     loop={true}
                     spaceBetween={2}
                     slidesPerView={7}
                     pagination={{ dynamicBullets: true }}
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
                        0: {
                           slidesPerView: 3,
                           allowTouchMove: true,
                           slidesPerGroup: 3,
                           navigation: false,
                           loopFillGroupWithBlank: true,
                        },
                        700: {
                           slidesPerGroup: 4,
                           slidesPerView: 4,
                           loopFillGroupWithBlank: true,
                        },
                        850: {
                           slidesPerGroup: 4,
                           slidesPerView: 5,
                           loopFillGroupWithBlank: true,
                        },
                        1220: {
                           slidesPerGroup: 6,
                           slidesPerView: 6,
                           loopFillGroupWithBlank: true,
                        },
                        1320: {
                           slidesPerGroup: 7,
                           slidesPerView: 7,
                           loopFillGroupWithBlank: true,
                        },
                     }}
                  >
                     {datas && datas.length > 0 && datas.map(({ img, linkTo }, index) => {
                           return (
                              <SwiperSlide key={index}>
                                 <div onClick={() => navigate(`/nghe-si/${linkTo}`)} className="choice_list-item slick-slide slick-cloned slick-active cursor-pointer">
                                    <div className="choice_list-item-link">
                                       <img src={img} alt=""/>
                                    </div>
                                 </div>
                              </SwiperSlide>
                           )
                        })}
                     <>
                        <button ref={navigationPrevRef} type="button" className="choice-btn-left slick-prev slick-arrow" style={{ display: "flex" }}>
                           <span className="material-icons-outlined">arrow_back_ios</span>
                        </button>
                        <button ref={navigationNextRef} type="button" className="choice-btn-right slick-next slick-arrow" style={{ display: "flex" }}>
                           <span className="material-icons-outlined">arrow_forward_ios</span>
                        </button>
                     </>
                  </Swiper>
               )}
            </div>
         </div>
      )
   } catch(error) {
      console.log(error);
   }
});

export default ArtistSpotlight;