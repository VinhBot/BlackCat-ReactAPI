import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { setThemes } from "../../../../assets/redux/Features/themeSetFeatures.js";
import { themes } from "../../../../assets/dataThemes.js";
import { PortalStyle } from "../../../../assets/styledComponents";

const ThemePortal = memo((props) => {
   const { handleClose } = props;
   const handleClickBackdrop = (e) => {
      if(e.target.id === "modal" || e.target.id === "theme-overlay") {
         return handleClose();
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
   /*========================================================
   # ThemeItem
   ========================================================*/
   const Items = memo(({ item }) => {
   const { name, itemS } = item
   const dispatch = useDispatch()

   const dataTheme = useSelector((state) => state.themetoggle)
   const handleClickApply = () => {
      dispatch(setThemes(item))
   }

   const img = itemS.slice(itemS.lastIndexOf("/"))
   return (
      <div className="column mb-[20px] is-fullhd-2 is-widescreen-2 is-desktop-20 is-touch-3 is-tablet-4 mobile-12">
         <div className="zm-card zm-card-theme">
            <div className="zm-card-image theme-image">
               <figure className="image image is-48x48">
                  <LazyLoadImage visibleByDefault={itemS === img} effect={"blur"} src={itemS} alt={name} />
               </figure>
               {dataTheme.name === name && dataTheme.itemS === itemS && <i className="icon ic-check" />}
               <div className="opacity" />
               <div className="zm-box zm-actions theme-actions">
                  <div className="zm-btn mar-b-10">
                     <div>
                        <button
                           onClick={() => handleClickApply()}
                           className="zm-btn active is-small is-outlined is-upper button hover:brightness-90 "
                           tabIndex={0}
                        >
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
               <h4 className="title is-6">{name}</h4>
            </div>
         </div>
      </div>
    )
   })
   const ThemeItem = memo(({ item }) => {
      const { items, title } = item
      return (
        <>
          <h3 className="title">{title}</h3>
          <div className="columns is-multiline">
            {items.map((e, index) => (
               <Items key={index} item={e}/>
            ))}
          </div>
        </>
      );
   });
   /*========================================================
   # render
   ========================================================*/
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
                        {themes.map((e, index) => {
                           return <ThemeItem key={index} item={e}></ThemeItem>
                        })}
                     </div>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      </PortalStyle>
   )
});

export default ThemePortal;