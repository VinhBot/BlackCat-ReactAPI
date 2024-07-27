import { configureStore } from "@reduxjs/toolkit";
import toggleOpenMain from "./Features/openMainFullFeatures.js";
import currentTimes from "./Features/SetTimeCurrentFeatures.js";
import formSearch from "./Features/formSearchFeatures.js";
import themeToggle from "./Features/themeSetFeatures.js";
import logged from "./Features/loggedFeatures.js";
import Lyrics from "./Features/LyricsFeatures.js";
import queueNowPlay from "./Features/QueueFeatures";
import setting from "./Features/settingPlayFeatures.js";
import setOpenMainMv from "./Features/toggleMainMvFeatures.js";
import toggleRight from "./Features/toggleRightFeatures.js";
import setTextBtn from "./Features/MvStateFeatures.js";
import authSlice from "./Features/authFeatures.js";
/**
 * authAction
 */
export const authAction = authSlice.actions;

const store = configureStore({
   reducer: {
      formsearch: formSearch,
      logged: logged,
      lyrics: Lyrics,
      toggleOpenMain: toggleOpenMain,
      queueNowPlay: queueNowPlay,
      currentTimes: currentTimes,
      themetoggle: themeToggle,
      setting: setting,
      setOpenMainMv: setOpenMainMv,
      toggleright: toggleRight,
      setTextBtn: setTextBtn,
      auth: authSlice.reducer,
   },
});

export default store;