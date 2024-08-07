import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { scrollTop } from "../../assets/functions.js"
import { AxiosAPI } from "../../assets/api.js"
import { LoadingSvg } from "../loading/LoadingSvg"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"
import { v4 as uuidv4 } from "uuid"

const SearchPagePlaylist = () => {
   const { id } = useParams();
   const [datas, setData] = useState([]);
   const fetchData = async () => {
      const data = await AxiosAPI.getSearchByType(id, "playlist");
      setData(data);
   };
   useEffect(() => {
      scrollTop()
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);
   if (datas?.length === 0) return <LoadingSvg/>;
   return (
      <div>
         <PlayListSelector classAdd2={"!flex-wrap"} key={uuidv4()} title={"Playlist/Album"}>
            {datas && datas?.items?.length > 0 && datas?.items?.map((e, index) => {
                  let classGird = "col l-2-4 m-3 c-6 !mb-[30px]"
                  return <CarouselItem key={e.encodeId} artis={true} desc={false} class1={classGird} item={e}/>
               })}
         </PlayListSelector>
      </div>
   );
};

export default SearchPagePlaylist;
