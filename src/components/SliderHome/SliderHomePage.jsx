import { Navigation, Autoplay, Pagination, Scrollbar } from "swiper/modules";
import React, { memo, useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideStyle } from "../../assets/styledComponents";

const datas = [
    {
        banner: "/assets/Img/SliderHomePage/genshinImpact01.jpg",
        encodeId: "SC0BEA08"
    },
    {
        banner: "/assets/Img/SliderHomePage/anime01.webp",
        encodeId: "Z77O7EE7"
    },
    {
        banner: "/assets/Img/SliderHomePage/anime02.jpg",
        encodeId: "Z7789DC9"
    },
    {
        banner: "/assets/Img/SliderHomePage/anime03.jpg",
        encodeId: "60B8U0OB"
    },
    {
        banner: "/assets/Img/SliderHomePage/anime04.jpg",
        encodeId: "67B8A0CB"
    }
];

const SliderHomePage = memo(() => {
    const [displayImages, setDisplayImages] = useState(false);
    useEffect(() => {
        const delayImages = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setDisplayImages(true);
        };
        delayImages();
    }, []);
    return (
        <SlideStyle>
            <div className="gallery mr-[-15px] ml-[-15px]">
                <div className="gallery-container slider_list min-h-[160px]">
                    <Swiper
                        modules={[Autoplay, Scrollbar, Navigation, Pagination]}
                        loop={true}
                        speed={600}
                        spaceBetween={50}
                        centeredSlides={true}
                        allowTouchMove={false}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                allowTouchMove: true,
                                navigation: false,
                                autoplay: {
                                    delay: 3000,
                                    disableOnInteraction: false,
                                },
                            },
                            600: {
                                slidesPerView: 2,
                                allowTouchMove: true,
                            },
                            1040: {
                                slidesPerView: 3,
                                allowTouchMove: true,
                            },
                        }}
                    >
                        {displayImages && datas.length > 0 ? datas.map((e) => (
                            <SwiperSlide key={e.banner}>
                                <div className="gallery-item">
                                    <div className="zm-card cursor-pointer">
                                        <div className="zm-card-image">
                                            <LazyLoadImage height="auto" src={e.banner} alt="sliderImage" />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )) : Array(3).fill(0).map((_, index) => (
                            <SwiperSlide key={index}>
                                <div className="gallery-item">
                                    <div className="zm-card cursor-pointer">
                                        <div className="zm-card-image">
                                            <div className="skeleton w-full h-[216px]" />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </SlideStyle>
    );
});

export default SliderHomePage;