import { useSelector, useDispatch } from "react-redux";
import { setting } from "../../../assets/redux/Features/settingPlayFeatures.js";

const PortalSetting = () => {
   const isBgFull = useSelector((state) => state.setting.isBgFull);
   const textSize = useSelector((state) => state.setting.text);
   const dispatch = useDispatch(); 

   const onClickTextSize = (e) => {
      dispatch(setting.actions.setSizeText(e));
   };

   return (
      <ul className="nowplaying-header_setting-item-list">
         <li>
            <p>Hình nền</p>
            <input onChange={(e) => dispatch(setting.actions.setAciteTheme(e.target.checked))} id="nowPlayingTheme" defaultChecked={isBgFull} type="checkbox" />
         </li>
         <li>
            <p>Cỡ chữ lời nhạc</p>
            <div className={`list  `}>
               <button onClick={() => onClickTextSize(1)} className={`nowplaying-header_setting-item-font-text ${textSize === 1 ? "active" : ""}`}>
                  A
               </button>
               <button onClick={() => onClickTextSize(2)} className={`nowplaying-header_setting-item-font-text ${textSize === 2 ? "active" : ""}`}>
                  A
               </button>
               <button onClick={() => onClickTextSize(3)} className={`nowplaying-header_setting-item-font-text ${textSize === 3 ? "active" : ""}`}>
                  A
               </button>
            </div>
         </li>
      </ul>
   );
};

export default PortalSetting
