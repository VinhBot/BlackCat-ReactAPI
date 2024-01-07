import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";

import { logOut } from "../../../assets/redux/Features/authFeatures.js";
import { LoginPortalStyyles } from "../../../assets/styledComponents";

const LoginPortal = ({ setOpen }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { pathname } = useLocation();
   const activeUser = useSelector((state) => state.auth.activeUser);
   const handleSignOut = async() => {
      setOpen(false);
      dispatch(logOut());
      if(pathname.search("mymusic") > 0) {
         navigate("/");
      };
      toast("Đã đăng xuất");
   };

   return (
      <LoginPortalStyyles className="menu menu-settings setting-header header-dropdown pad-t-0">
         <ul className="menu-list">
            <li className="header-player-setting">
               <a target="_blank" href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=%s" rel="noreferrer">
                  <button className="zm-btn button w-full" tabIndex={0}>
                     <i className="icon ic-20-VIP-2" />
                     <span>Nâng cấp VIP</span>
                  </button>
               </a>
            </li>
            <li className="header-player-setting">
               {activeUser && (
                  <button
                     onClick={() => {
                        navigate("/mymusic/info");
                        setOpen(false);
                     }}
                     className="w-full zm-btn button cursor-pointer"
                     tabIndex={0}
                  >
                     <i className="icon ic-24-Privacy"></i>
                     <span>Thông tin tài khoản</span>
                  </button>
               )}
            </li>

            <li className="header-player-setting logout-header">
               <div>
                  {activeUser && (
                     <button onClick={handleSignOut} className="w-full zm-btn button cursor-pointer" tabIndex={0}>
                        <i className="icon ic-log-out" />
                        <span>Đăng xuất</span>
                     </button>
                  )}
                  {!activeUser && (
                     <button onClick={() => navigate("/auth")} className="w-full zm-btn button cursor-pointer" tabIndex={0}>
                        <i className="icon ic-log-out" />
                        <span>Đăng Nhập</span>
                     </button>
                  )}
               </div>
            </li>
         </ul>
      </LoginPortalStyyles>
   );
};

const ItemLogin = ({ isTitle = true, width = 38, height = 38 }) => {
   const [open, setOpen] = useState(false);
   const users = useSelector((state) => state.auth);
   return (
      <Tippy
         animation={"perspective-extreme"}
         onClickOutside={() => setOpen(false)}
         visible={open}
         content={<LoginPortal setOpen={setOpen}/>}
         interactive={true}
         arrow={false}
         offset={[0, 10]}
         placement={"bottom-end"}
      >
         <div onClick={() => setOpen((value) => !value)} className="setting_item setting_item-user">
            <div className={`w-[${width}px] h-[${height}px] setting_item-user-img  overflow-hidden rounded-full`}>
               <figure>
                  <img className={`object-cover h-[40px] w-[40px]`} src={users.profileImage ? users.profileImage : "https://avatar.talk.zdn.vn/default"} alt=""/>
               </figure>
            </div>
            {isTitle && !open && <span className="setting_item-title">Cá Nhân</span>}
         </div>
      </Tippy>
   )
}

export default ItemLogin;