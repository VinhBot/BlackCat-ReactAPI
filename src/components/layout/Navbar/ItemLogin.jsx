import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";

import { handlerSignIn } from "../../../assets/firebase/firebase-config.js";
import { logOut } from "../../../assets/redux/Features/authFeatures.js";
import { LoginPortalStyyles } from "../../../assets/styledComponents";

const ItemLogin = ({ isTitle = true, width = 38, height = 38 }) => {
   const activeUser = useSelector((state) => state.auth.activeUser);
   const users = useSelector((state) => state.auth);
   const [open, setOpen] = useState(false);
   const { pathname } = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { handleSignOut: SignOut } = handlerSignIn();
   const handleSignOut = async () => {
      dispatch(logOut());
      setOpen(false);
      SignOut();
      if (pathname.search("mymusic") > 0) {
         navigate("/");
      };
      toast("Đã đăng xuất");
   };
   const userInfo = () => {
      navigate("/mymusic/info");
      setOpen(false);
   };

   return (
      <Tippy
         animation={"perspective-extreme"}
         onClickOutside={() => setOpen(false)}
         visible={open}
         content={
            <LoginPortalStyyles className="menu menu-settings setting-header header-dropdown pad-t-0">
               <ul className="menu-list">
                  {/* Phần nâng cấp vjp cho người dùng (Đang test) */}
                  <li className="header-player-setting">
                     <a target="_blank" href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=%s" rel="noreferrer">
                        <button className="zm-btn button w-full" tabIndex={0}>
                           <i className="icon ic-20-VIP-2" />
                           <span>Nâng cấp VIP</span>
                        </button>
                     </a>
                  </li>
                  {/* Phần thông tin của người dùng */}
                  <li className="header-player-setting">
                     {activeUser && (
                        <button onClick={userInfo} className="w-full zm-btn button cursor-pointer" tabIndex={0}>
                           <i className="icon ic-24-Privacy"></i>
                           <span>Thông tin tài khoản</span>
                        </button>
                     )}
                  </li>
                  {/* Phần đăng xuất và đăng nhập của người dùng */}
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
         }
         interactive={true}
         arrow={false}
         offset={[0, 10]}
         placement={"bottom-end"}
      >
         <div onClick={() => setOpen((value) => !value)} className="setting_item setting_item-user">
            <div className={`w-[${width}px] h-[${height}px] setting_item-user-img  overflow-hidden rounded-full`}>
               <figure>
                  <img className={`object-cover h-[40px] w-[40px]`} src={users.profileImage ? users.profileImage : "https://avatar.talk.zdn.vn/default"} alt="" />
               </figure>
            </div>
            {isTitle && !open && <span className="setting_item-title">Cá Nhân</span>}
         </div>
      </Tippy>
   );
};

export default ItemLogin;