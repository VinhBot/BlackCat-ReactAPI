import React, { memo, useState, useLayoutEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import PlayListSelector from "../Selection/PlayListSelector";
import { AxiosAPI } from "../../assets/api.js";
import MvItem from "./MvItem";

const MvDataList = memo(({ item }) => {
   const [datas, setData] = useState([]);
   const fetchData = useCallback(async () => {
      const data = await AxiosAPI.getArtistPage(item.alias);
      const res = data.sections?.find((e) => e.sectionType === "video");
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
         {datas?.slice(0, 8).map((e) => <MvItem isMvFull key={uuidv4()} data={e}/>)}
      </PlayListSelector>
   );
});

export default MvDataList;
