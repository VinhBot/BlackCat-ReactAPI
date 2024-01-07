import React, { memo, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NewReleaseitem from "../NewReleaseitem/NewReleaseitem";
import PlayListSelector from "../Selection/PlayListSelector";
import { useGetHomePage } from "../../assets/api.js";
import { NewReleaseStyle } from "../../assets/styledComponents";

const NewReleaseHomePage = memo(() => {
    const [selectList, setSelectList] = useState(false);
    const [datas, setData] = useState(null);
    const { data, status } = useGetHomePage();
    const dataSelector = data?.data.items.find((e) => e.sectionType === "new-release");

    useEffect(() => {
      if(dataSelector) {
         setData(dataSelector?.items);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    const SongList = memo(() => {
      if (!datas) return;
      const dataSong = datas?.vPop;
      const colSong1 = dataSong?.slice(0, 4);
      const colSong2 = dataSong?.slice(4, 8);
      const colSong3 = dataSong?.slice(8, 12);

      return (
         <>
            <div className="col l-4 m-6 c-9">
               {colSong1 && colSong1.map((e) => <NewReleaseitem key={uuidv4()} item={e}/>)}
            </div>
            <div className="col l-4 m-6 c-9">
               {colSong2 && colSong2.map((e) => <NewReleaseitem key={uuidv4()} item={e}/>)}
            </div>
            <div className="col l-4 m-0 c-9">
               {colSong3 && colSong3.map((e) => <NewReleaseitem key={uuidv4()} item={e}/>)}
            </div>
         </>
      );
    });

    const AlbumList = memo(() => {
      // if (!datas) return
      // const dataAlbum = datas?.album
      // const colSong1 = dataAlbum?.slice(0, 3)
      // const colSong2 = dataAlbum?.slice(3, 6)
      // const colSong3 = dataAlbum?.slice(6, 9)
      if (!datas) return
      const dataSong = datas?.others
      const colSong1 = dataSong?.slice(0, 4)
      const colSong2 = dataSong?.slice(4, 8)
      const colSong3 = dataSong?.slice(8, 12)

      return (
         <>
            <div className="col l-4 m-6 c-9">
               {colSong1 && colSong1.map((e) => <NewReleaseitem key={uuidv4()} item={e}/>)}
            </div>
            <div className="col l-4 m-6 c-9">
               {colSong2 && colSong2.map((e) => <NewReleaseitem key={uuidv4()} item={e}/>)}
            </div>
            <div className="col l-4 m-0 c-9">
               {colSong3 && colSong3.map((e) => <NewReleaseitem key={uuidv4()} item={e}/>)}
            </div>
         </>
      );
    });

    const buttonInt = () => {
      return (
        <div className="genre-select mb-[20px]">
          <button onClick={() => setSelectList(false)} className={`zm-btn  button ${selectList ? "" : "active"}`}>
            VIỆT NAM
          </button>
          <button onClick={() => setSelectList(true)} className={`zm-btn button ${selectList ? "active" : ""}`}>
            QUỐC TẾ
          </button>
        </div>
      );
    };
    return (
      <NewReleaseStyle>
         <PlayListSelector to="moi-phat-hanh" childrenOption = {buttonInt()} title={dataSelector?.title} all={true} className2="h-[320px]">
            {!selectList ? <SongList/> : <AlbumList/>}
         </PlayListSelector>
      </NewReleaseStyle>
   );
});

export default NewReleaseHomePage
