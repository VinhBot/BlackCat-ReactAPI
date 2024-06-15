import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippyjs/react";

import { removeList } from "../../../assets/redux/Features/QueueFeatures.js";
import { setPlay } from "../../../assets/redux/Features/settingPlayFeatures.js";
import { _LoginPortalStyyles as LoginPortalStyyles } from "../../../assets/styledComponents";


const LoginPortal = ({ setOpen }) => {
   const dispatch = useDispatch();
   const handlRemoveList = () => {
      dispatch(setPlay(false));
      dispatch(removeList());
      setTimeout(() => {
         setOpen(false);
      }, 200);
   };

   return (
      <LoginPortalStyyles className="menu menu-settings setting-header header-dropdown pad-t-0">
         <ul className="menu-list">
            <li className="header-player-setting">
               <button onClick={handlRemoveList} className="w-full zm-btn button cursor-pointer" tabIndex={0}>
                  <i className="icon ic-delete"></i>
                  <span>Xoá danh sách phát</span>
               </button>
               
            </li>
         </ul>
      </LoginPortalStyyles>
   )
}
const RemoveList = memo(() => {
   const [open, setOpen] = useState(false);
   return (
      <Tippy animation={"perspective-extreme"} onClickOutside={() => setOpen(false)} visible={open} content={<LoginPortal setOpen={setOpen}/>} interactive={true} arrow={false} offset={[0, 10]} placement={"bottom-end"}>
         <div onClick={() => setOpen((value) => !value)} className="player_btn queue_more">
            <span className="material-icons-outlined"> more_horiz </span>
            <div className="playing_title-hover">Khác</div>
         </div>
      </Tippy>
   )
});

export default RemoveList;