import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { setThemes } from "../../../../assets/redux/Features/themeSetFeatures.js";
import { PortalStyle } from "../../../../assets/styledComponents";
import { themes } from "../../../../assets/dataThemes.js";

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
   )
});

export default ThemePortal;