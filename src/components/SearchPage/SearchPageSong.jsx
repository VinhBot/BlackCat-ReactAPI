import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { scrollTop } from "../../assets/functions.js"
import { AxiosAPI } from "../../assets/api.js"
import { LoadingSvg } from "../loading/LoadingSvg"
import PlayListSelector from "../Selection/PlayListSelector"
import ItemChartList from "../TopChartPage/ItemChartList"

const SearchPageSong = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = async () => {
      const data = await AxiosAPI.getSearchByType(id, "song");
      setData(data.data.data);
   };

   useEffect(() => {
      scrollTop();
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id])

   if (datas?.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         <PlayListSelector classAdd="mb-[36px]" notRow classAdd2="w-full" title={"Bài Hát"}>
            <div className="main_topchart mt-2">
               <div className="container_zing-chart">
                  <div className="zing-chart_list pt-2">
                     {datas &&
                        datas?.items?.length > 0 &&
                        datas?.items?.map((e, index) => {
                           return <ItemChartList isNotList isNoneRank item={e} index={index} key={e.encodeId}></ItemChartList>
                        })}
                  </div>
               </div>
            </div>
         </PlayListSelector>
      </div>
   )
}

export default SearchPageSong
