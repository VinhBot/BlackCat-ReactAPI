import React, { memo, useState, useLayoutEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import MvItem from "./MvItem";

import { AxiosAPI } from "../../assets/api.js"
import PlayListSelector from "../Selection/PlayListSelector"

const MvDataList = memo(({ item }) => {
   const [datas, setData] = useState([]);

   const fetchData = useCallback(async () => {
      const data = await AxiosAPI.get(`/api/artist/${item.alias}`)
      const res = data.data.data.sections?.find((e) => e.sectionType === "video")
      setData(res.items);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useLayoutEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   if (datas.length === 0) return;

   return (
      <PlayListSelector classAdd2={"container_top100-list "} key={uuidv4()} title={`MV Của ${item.name} `}>
         {datas?.slice(0, 8).map((e) => {
            return <MvItem isMvFull key={uuidv4()} data={e}/>
         })}
      </PlayListSelector>
   )
})

export default MvDataList
