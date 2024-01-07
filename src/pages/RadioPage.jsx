import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { LoadingImage } from "../components/loading/LoadingSvg.jsx";
import RadioHomePage from "../components/SliderHome/RadioHomePage.jsx";
import CategoryRadio from "../components/RadioPage/CategoryRadio.jsx";
import DiscoverPoscast from "../components/RadioPage/DiscoverPoscast.jsx";
import FeaturedEpisodesRadio from "../components/RadioPage/FeaturedEpisodesRadio.jsx";
import NewProgramRaido from "../components/RadioPage/NewProgramRaido.jsx";
import RadReplayRadio from "../components/RadioPage/RadReplayRadio.jsx";
import SidleRadio from "../components/RadioPage/SidleRadio.jsx";
import { useGetRadioPage } from "../assets/api.js";

const RadioPage = () => {
   const { data, status } = useGetRadioPage();
   const [datas, setData] = useState([]);
   useEffect(() => {
      if(data) {
         setData(data.data.items);
         toast("Radio đang phát triển, vui lòng thông cảm!", {
            type: "info",
         });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [status]);
   // const selectorListent = datas?.find((e) => e.title === "Đón nghe");
   const selectorReplay = datas?.filter((e) => e.sectionId === "radReplay");
   const selectorNewShow = datas?.find((e) => e.sectionId === "radLastestProgram");
   const selectorCategoryRadio = datas?.find((e) => e.sectionId === "radPromoteCategory");
   const selectorDiscoverPoscast = datas?.find((e) => e.sectionId === "radPromoteProgram");
   const selectorFeaturedEpisodes = datas?.find((e) => e.sectionId === "radPromoteEpisode");
   const selectorFeaturedPrograms = datas?.find((e) => e.sectionId === "radSponsoredProgram");
   
   if(datas.length === 0) return <LoadingImage image={0}/>

   return (
      <div className="mt-1">
         {/* Raido home */}
         <RadioHomePage isNotAll/>
         {/* Khám Phá Poscast */}
         <DiscoverPoscast data={selectorDiscoverPoscast}/>
         {/* Đón Nghe  */}
         {/* <SidleRadio data={selectorListent}/>   */}
         {/* Thể Loại Poscast */}
         <CategoryRadio data={selectorCategoryRadio}/>
         {/* Tập Nổi Bật */}
         <FeaturedEpisodesRadio data={selectorFeaturedEpisodes}/>
         {/* Chương Trình Nổi Bật */}
         <SidleRadio isFeatured data={selectorFeaturedPrograms}/>
         {/* Nghe Lai ... */}
         <RadReplayRadio data={selectorReplay}/>
         {/* Chuơng Trình Mới */}
         <NewProgramRaido data={selectorNewShow}/>
      </div>
   )
}

export default RadioPage;