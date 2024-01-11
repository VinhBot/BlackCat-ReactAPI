import React from "react";
import { scrollTop } from "../assets/functions.js";

import SliderHomePage from "../components/SliderHome/SliderHomePage.jsx";
import HistoryHomePage from "../components/SliderHome/HistoryHomePage.jsx";
import WantToHearHomePage from "../components/SliderHome/WantToHearHomePage.jsx";
import NewReleaseHomePage from "../components/SliderHome/NewReleaseHomePage.jsx";
import NewMusicEveryDayHomePage from "../components/SliderHome/NewMusicEveryDayHomePage.jsx";
import Top100HomePage from "../components/SliderHome/Top100HomePage.jsx";
import FavoriteArtistHomePapge from "../components/SliderHome/FavoriteArtistHomePapge.jsx";
import WeekChartHomePage from "../components/SliderHome/WeekChartHomePage.jsx";
import ArtistSpotlight from "../components/SliderHome/ArtistSpotlight.jsx";
import RadioHomePage from "../components/SliderHome/RadioHomePage.jsx";
import NewMusicHomePage from "../components/SliderHome/NewMusicHomePage.jsx";
import NewMusicHomePage2 from "../components/SliderHome/NewMusicHomePage2.jsx";
import EventHomePage from "../components/SliderHome/EventHomePage.jsx";
import ButtonIconHomePage from "../components/SliderHome/ButtonIconHomePage.jsx";


const HomePage = React.memo(() => {
  React.useEffect(() => {
    scrollTop();
  }, []);
  return (
    <div>
      <SliderHomePage/>
      <ButtonIconHomePage/>
      <HistoryHomePage/>
      <WantToHearHomePage/>
      <NewReleaseHomePage/>
      <FavoriteArtistHomePapge/>
      <WeekChartHomePage/>
      <ArtistSpotlight/>
      <Top100HomePage/>
      <RadioHomePage/>
      <NewMusicHomePage/>
      <NewMusicHomePage2/>
      <NewMusicEveryDayHomePage/>
      <EventHomePage/>
    </div>
  );
});

export default HomePage;