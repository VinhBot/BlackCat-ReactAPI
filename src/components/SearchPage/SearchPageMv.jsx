import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AxiosAPI } from "../../assets/api.js"
import { scrollTop } from "../../assets/functions.js"
import { LoadingSvg } from "../loading/LoadingSvg"
import PlayListSelector from "../Selection/PlayListSelector"
import { v4 as uuidv4 } from "uuid"
import MvItem from "../MVpage/MvItem"

const SearchPageMv = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = async () => {
      const data = await AxiosAPI.getSearchByType(id, "video");
      setData(data);
   };

   useEffect(() => {
      scrollTop()
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id])

   if (datas?.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-container ">
            <PlayListSelector classAdd2={"container_top100-list "} title={"MV"}>
               {datas &&
                  datas?.items?.length > 0 &&
                  datas?.items?.map((e, index) => {
                     return <MvItem key={uuidv4()} data={e}></MvItem>
                  })}
            </PlayListSelector>
         </div>
      </div>
   )
}

export default SearchPageMv
