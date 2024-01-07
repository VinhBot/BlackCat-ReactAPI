import React, { memo } from "react";
import { v4 as uuidv4 } from "uuid";

import FavoriteArtisItem from "../Selection/FavoriteArtisItem";
import PlayListSelector from "../Selection/PlayListSelector";

const NationsHub = memo((data) => {
   return (
      <PlayListSelector classAdd2={"!flex-wrap"} title={"Quốc Gia"}>
         {data && data?.data?.length > 0 && data?.data?.map((e, index) => {
            let classGird = "col l-3 m-6 !mb-6 c-6"
            return <FavoriteArtisItem isCenter key={uuidv4()} clasName={classGird} isHub item={e}/>
         })}
      </PlayListSelector>
   )
})

export default NationsHub;