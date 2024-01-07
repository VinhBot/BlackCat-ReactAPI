import React, { memo, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PlayListSelector from "../Selection/PlayListSelector";
import { AxiosAPI } from "../../assets/api.js";
import CarouselItem from "../Selection/CarouselItem";


const NewMusicEveryDayHomePage = memo(() => {
   const [datas, setData] = useState(null);
   const { data, status } = AxiosAPI.useGetHomePage();

   // const dataSelector = data?.data.items.find((e) => e.sectionId === "hAutoTheme2");
   const dataSelector = data?.data.items[4];

   useEffect(() => {
      if(data) {
         setData(dataSelector?.items)
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [status]);

   return (
      <PlayListSelector title={dataSelector?.title}>
         {datas?.length > 0 && datas.map((e, index) => {
            let classGird = "col l-2-4 m-3 c-5"
            if (index === 4) {
              classGird = "col l-2-4 m-0 c-5"
            };
            return (<CarouselItem isSwiper={true} key={e.encodeId} artis={true} desc={false} class1={classGird} item={e}/>)
         })}
         {!datas && Array(5).fill(0).map((e, index) => {
            let classGird = "col l-2-4 m-3 c-5"
            if(index === 4) {
              classGird = "col l-2-4 m-0 c-5"
            };
            return (<CarouselItem.Loading key={uuidv4()} artis={false} desc={false} class1={classGird} item={e}/>)
         })}
      </PlayListSelector>
   );
});

export default NewMusicEveryDayHomePage;
