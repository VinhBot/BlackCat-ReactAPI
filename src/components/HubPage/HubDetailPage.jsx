import React, { useState, useCallback, useLayoutEffect } from "react";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { LoadingSvg } from "../loading/LoadingSvg";
import PlayListSelector from "../Selection/PlayListSelector";
import CarouselItem from "../Selection/CarouselItem";
import NewReleaseitem from "../NewReleaseitem/NewReleaseitem";
import MvItem from "../MVpage/MvItem";
import ItemArits from "../MyMusicPage/ItemArits";
import { AxiosAPI } from "../../assets/api.js";

import { HubDetailPageStyles } from "../../assets/styledComponents";


const HubDetailPage = () => {
   const { id } = useParams()
   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await AxiosAPI.getHubDetail(id);
      setData(data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useLayoutEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   if (datas?.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <HubDetailPageStyles>
         <div className="cover">
            <div className="blur" style={{ background: `url("${datas?.cover}") center top / cover no-repeat` }}/>
         </div>

         <div>
            {datas?.sections.length === 1 && datas.sections.map((e, index) => {
                  let mt;
                  if (index === 0) {
                     mt = "!mt-0"
                  }

                  return (
                     <PlayListSelector classAdd={mt} key={index} title={e?.title}>
                        {e.items.map((item, index) => {
                           let classGird = "col l-2-4 m-3 c-5 !mb-[30px]"

                           return (
                              <CarouselItem
                                 isSwiper={true}
                                 key={index}
                                 artis={true}
                                 desc={false}
                                 class1={classGird}
                                 item={item}
                              />
                           )
                        })}
                     </PlayListSelector>
                  )
               })}
            {datas?.sections.length > 1 && datas?.sections.map((e, index) => {
                  let mt;
                  if (index === 0) {
                     mt = "!mt-0"
                  }
                  if (e.title === "Hot Songs") {
                     const colSong1 = e.items?.slice(0, 5)
                     const colSong2 = e.items?.slice(5, 10)
                     const colSong3 = e.items?.slice(9, 14)
                     return (
                        <PlayListSelector key={uuidv4()} title={e?.title}>
                           <div className="col l-4 m-6 c-9">
                              {colSong1 && colSong1.map((e) => <NewReleaseitem key={uuidv4()} item={e}></NewReleaseitem>)}
                           </div>
                           <div className="col l-4 m-6 c-9">
                              {colSong2 && colSong2.map((e) => <NewReleaseitem key={uuidv4()} item={e}></NewReleaseitem>)}
                           </div>
                           <div className="col l-4 m-0 c-9">
                              {colSong3 && colSong3.map((e) => <NewReleaseitem key={uuidv4()} item={e}></NewReleaseitem>)}
                           </div>
                        </PlayListSelector>
                     )
                  }

                  if (e.sectionType === "artist") {
                     return (
                        <PlayListSelector
                           key={uuidv4()}
                           all={false}
                           classAdd={"container_radio "}
                           classAdd2={"mb-[10px]"}
                           title={e.title}
                        >
                           {e?.items?.map((item, index) => {
                              if (index > 4) return
                              let classGird = "col l-2-4 m-3 c-5"
                              if (index === 4) {
                                 classGird = "col l-2-4 m-0 c-5"
                              }

                              return <ItemArits classGird={classGird} key={uuidv4()} data={item}></ItemArits>
                           })}
                        </PlayListSelector>
                     )
                  }
                  if (e.sectionType === "video") {
                     return (
                        <PlayListSelector classAdd="artist-mv " key={uuidv4()} title={e.title}>
                           {e?.items?.map((item, index) => {
                              if (index > 2) return

                              return <MvItem key={uuidv4()} data={item} isAritst></MvItem>
                           })}
                        </PlayListSelector>
                     )
                  }
                  return (
                     <PlayListSelector classAdd={mt} key={uuidv4()} title={e?.title}>
                        {e.items.map((item, index) => {
                           if (index > 4) return
                           let classGird = "col l-2-4 m-3 c-5"
                           if (index === 4) {
                              classGird = "col l-2-4 m-0 c-5"
                           }

                           return (
                              <CarouselItem
                                 isSwiper={true}
                                 key={uuidv4()}
                                 artis={true}
                                 desc={false}
                                 class1={classGird}
                                 item={item}
                              />
                           )
                        })}
                     </PlayListSelector>
                  )
               })}
         </div>
      </HubDetailPageStyles>
   )
}

export default HubDetailPage
