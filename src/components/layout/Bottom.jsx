import { useSelector } from "react-redux";
import React, { memo } from "react";
import ViewPlayMusicMain from "./ViewPlayMusicFull/ViewPlayMusicMain.jsx";
import BottomPlayer from "./Bottom/BottomPlayer.jsx";
import BottomRight from "./Bottom/BottomRight.jsx";

const BottomPlay = memo(() => {
   const isOpen = useSelector((state) => state.toggleOpenMain.isOpen);
   const isOpenClass = useSelector((state) => state.toggleOpenMain.isOpenClass);
   return (
      <div className={`playing-bar ${isOpenClass ? "active" : ""}`}>
         <BottomPlayer/>
         <BottomRight/>
         {isOpen && <ViewPlayMusicMain/>}
      </div>
   );
});

export default BottomPlay;