import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { setThemes } from "../../../../assets/redux/Features/themeSetFeatures.js";
import { PortalStyle } from "../../../../assets/styledComponents";
/**
 * dataStyle: [
      "--layout-bg: #3d3d3d", // khi kéo suống dưới
      "--player-bg: #3d3d3d", // màu thanh phát nhạc 
      "--primary-bg: #3d3d3d", // màu bảng chọn giao diện
      "--purple-primary: #3d3d3d", // màu nút, hiện tại đang chọn
      "--box-hot-item-bg: rgba(255, 0, 234, 0.3)", // 
      "--box-hot-item-bg-hover: rgba(255, 0, 234, 0.3)", //
      "--link-text-hover: #ffd966", // màu các tùy chọn như: cá nhân, top chat, radio .... 
      "--text-item-hover: #f44336", // màu lựa chọn hiện tại
   ],
 */

const themes = [
   {
      title: "Chủ Đề Mặc Định",
      items: [
         {
            name: "XONE",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/xone-thumbn.jpg",
            dataTheme: "dark",
            bgImg: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/xone-bg.jpg",
            bgPlaying: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1//images/theme/xone-miniplayer.jpg",
            bgHeader: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1//images/theme/xone-header.jpg",
            dataStyle: [
               "--purple-primary: #D1AB00",
               "--primary-bg: #363636",
               "--progressbar-active-bg: #d7cb1f",
               "--link-text-hover: #E5BB00",
               "--miniplayer-bg-img: url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/xone-miniplayer.jpg')",
               "--header-bg-img: url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/xone-header.jpg')",
            ],
         }, {
            name: "Zing Music Awards",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/zma.jpg",
            dataTheme: "blue",
            bgImg: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/zma.svg",
            bgPlaying: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-player/zma.png",
            bgHeader: false,
            dataStyle: [
               "--layout-bg: #37075d",
               "--primary-bg: #4B1178",
               "--queue-player-popup-bg: #5d218c",
               "--purple-primary: #ed2b91",
               "--link-text-hover: #fe63da",
               "--sidebar-popup-bg: #572f90",
               "--linear-gradient-bg: linear-gradient(to bottom, #740091, #2d1a4c)",
               "--miniplayer-bg-img: url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-player/zma.png')",
            ],
         }, {
            name: "Tháp Eiffel",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/eiffel.jpg",
            dataTheme: "dark",
            bgImg: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/eiffel.jpg",
            bgPlaying: false,
            bgHeader: false,
            dataStyle: ["--layout-bg: #282828", "--primary-bg: #3d3d3d"],
         },
      ],
   },
   {
      title: "Hình nền cho Máy tính",
      items: [
         {
            name: "Đường phố về đêm",
            itemS: "https://img6.thuthuatphanmem.vn/uploads/2022/02/25/background-duong-pho-anime-full-hd_081737938.jpeg",
            dataTheme: "blue",
            bgImg: "https://img6.thuthuatphanmem.vn/uploads/2022/02/25/background-duong-pho-anime-full-hd_081737938.jpeg",
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         },
         {
            name: "Code-Chill",
            itemS: "https://gamelandvn.com/wp-content/uploads/anh/2020/11/keqing-thumbnail.jpg",
            dataTheme: "blue",
            bgImg: "/assets/Img/Theme/Gif/Code-Chill/codechill.gif",
            bgPlaying: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1//images/theme/xone-header.jpg",
            bgHeader: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1//images/theme/xone-header.jpg",
            dataStyle: false,
         }
      ],
   },
   {
      title: "Màu Tối",
      items: [
         {
            name: "Tối",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dark.jpg",
            dataTheme: "dark",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         }, {
            name: "Tím",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/purple.jpg",
            dataTheme: "purple",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         }, {
            name: "Xanh Đậm",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue-light.jpg",
            dataTheme: "blue",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         }, {
            name: "Xanh Biển",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue.jpg",
            dataTheme: "blue-light",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         }, {
            name: "Xanh Lá",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/green.jpg",
            dataTheme: "blue-light",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         }, {
            name: "Nâu",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/brown.jpg",
            dataTheme: "brown",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         }, {
            name: "Hồng",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink.jpg",
            dataTheme: "pink",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         }, {
            name: "Đỏ",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/red.jpg",
            dataTheme: "red",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         },
      ],
   },
   {
      title: "Màu Sáng",
      items: [
         {
            name: "Sáng",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/light.jpg",
            dataTheme: "light",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         }, {
            name: "Xám",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/gray.jpg",
            dataTheme: "gray",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         }, {
            name: "Xanh Nhạt",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/green-light.jpg",
            dataTheme: "green-light",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         }, {
            name: "Hồng Cánh Sen",
            itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink-light.jpg",
            dataTheme: "pink-light",
            bgImg: false,
            bgPlaying: false,
            bgHeader: false,
            dataStyle: false,
         },
      ],
   },
];

const ThemePortal = memo((props) => {
   const dataTheme = useSelector((state) => state.themetoggle);
   const dispatch = useDispatch();
   const handleClickBackdrop = (e) => {
      if (e.target.id === "modal" || e.target.id === "theme-overlay") {
         return props.handleClose();
      };
   };

   const dropIn = {
      hidden: {
         y: "-100vh",
         opacity: 0,
      },
      visible: {
         y: "0",
         opacity: 1,
         transition: {
            duration: 0.3,
            type: "spring",
            damping: 25,
            stiffness: 300,
         },
      },
      exit: {
         y: "-100vh",
         opacity: 0,
      },
   };
   return (
      <PortalStyle>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="zm-portal-modal theme-modal-overlay" id="theme-overlay" onClick={handleClickBackdrop}>
            <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit" className="modal theme-modal is-active">
               <div role="presentation" className="modal-background">
                  <div className="modal-content">
                     <button onClick={handleClickBackdrop} id="modal" className="zm-btn zm-tooltip-btn close-btn is-hover-circle button" tabIndex={0}>
                        <i className="icon ic-close pointer-events-none" />
                     </button>
                     <h3 className="main-title title">Giao Diện</h3>
                     <div className="container">
                        {themes.map((setItem, index) => (
                           <div key={index}>
                              <h3 className="title">{setItem.title}</h3>
                              <div className="columns is-multiline">
                                 {setItem.items.map((item, keyID) => (
                                    <div key={keyID} className="column mb-[20px] is-fullhd-2 is-widescreen-2 is-desktop-20 is-touch-3 is-tablet-4 mobile-12">
                                       <div className="zm-card zm-card-theme">
                                          <div className="zm-card-image theme-image">
                                             <figure className="image image is-48x48">
                                                <LazyLoadImage visibleByDefault={item.itemS === item.itemS.slice(item.itemS.lastIndexOf("/"))} effect={"blur"} src={item.itemS} alt={item.name} />
                                             </figure>
                                             {dataTheme.name === item.name && dataTheme.itemS === item.itemS && <i className="icon ic-check" />}
                                             <div className="opacity" />
                                             <div className="zm-box zm-actions theme-actions">
                                                <div className="zm-btn mar-b-10">
                                                   <div>
                                                      <button onClick={() => dispatch(setThemes(item))} className="zm-btn active is-small is-outlined is-upper button hover:brightness-90 " tabIndex={0}>
                                                         Áp dụng
                                                      </button>
                                                   </div>
                                                </div>
                                                <button className="zm-btn is-small is-outlined is-upper button" tabIndex={0}>
                                                   Xem trước
                                                </button>
                                             </div>
                                          </div>
                                          <div className="zm-card-content">
                                             <h4 className="title is-6">{item.name}</h4>
                                          </div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      </PortalStyle>
   );
});

export default ThemePortal;