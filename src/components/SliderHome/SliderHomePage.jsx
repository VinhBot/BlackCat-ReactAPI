import { Navigation, Autoplay, Scrollbar, Pagination, A11y } from "swiper/modules";
import React, { memo, useState, useLayoutEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { AxiosAPI } from "../../assets/api.js";
import { SlideStyle } from "../../assets/styledComponents";

const SliderHomePage = memo(() => {
  const { data, status } = AxiosAPI.useGetHomePage();
  const [datas, setData] = useState(null);
  const dataNice = data?.data?.items.filter((e) => e.sectionType === "banner");
  useLayoutEffect(() => {
    if (data) {
      setData(dataNice[0].items);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <SlideStyle>
      <div className="gallery mr-[-15px] ml-[-15px]">
        <div className="gallery-container slider_list min-h-[160px]">
          <Swiper
            modules={[Autoplay, Scrollbar, Navigation, Pagination, A11y]}
            height={216} // Chiều cao vuốt (tính bằng px). Tham số cho phép buộc chiều cao Swiper. Chỉ hữu ích nếu bạn khởi chạy Swiper khi nó bị ẩn và trong môi trường SSR và Kiểm tra để khởi tạo Swiper chính xác
            loop={true} // Chế độ vòng lặp liên tục
            speed={600} // Thời gian chuyển đổi giữa các slide (tính bằng mili giây)
            allowTouchMove={false} // Nếu false, thì cách duy nhất để chuyển slide là sử dụng các hàm API bên ngoài như slidePrev hoặc slideNext
            autoplay={{ delay: 3500, disableOnInteraction: false }} // tự động chuyển đổi hình ảnh
            centeredSlides={true}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            /*
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            */
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current
              swiper.params.navigation.nextEl = navigationNextRef.current
            }}
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
                allowTouchMove: true,
                slidesPerView: 3
              },
            }}
          >
            <>
              <button ref={navigationPrevRef} type="button" className="slider_list-btn-left slick-prev slick-arrow">
                <span className="material-icons-outlined">arrow_back_ios</span>
              </button>
              <button ref={navigationNextRef} type="button" className="slider_list-btn-right slick-next slick-arrow ">
                <span className="material-icons-outlined">arrow_forward_ios</span>
              </button>
            </>

            {datas && datas.length > 0 && datas.map((e, index) => {
              return (
                <SwiperSlide key={e.banner}>
                  <div className="gallery-item">
                    <div className="zm-card cursor-pointer">
                      <div className="zm-card-image">
                        <LazyLoadImage height={"auto"} src={e.banner} alt="" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

            {(!datas || status === "loading") && Array(3).fill(0).map((e, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="gallery-item">
                    <div className="zm-card  cursor-pointer">
                      <div className="zm-card-image ">
                        <div className="skeleton w-full h-[216px]" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </SlideStyle>
  );
});

export default SliderHomePage;