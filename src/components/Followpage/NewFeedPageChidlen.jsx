import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import Masonry from "@mui/lab/Masonry";
import { v4 as uuidv4 } from "uuid";

import ArtistSpotlight from "../SliderHome/ArtistSpotlight";
import { LoadingSvg } from "../loading/LoadingSvg";
import { useWindowSize } from "../layout/Hook";
import { AxiosAPI } from "../../assets/api.js";
import FollowItems from "./FollowItems";

const NewFeedPageChidlen = () => {
  const { nation, id } = useParams();
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const numer = useRef(1);
  let col = 3;
  const { width } = useWindowSize();
  if (width <= 1400) {
    col = 2;
  };
  if (width <= 600) {
    col = 1;
  };
  useLayoutEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading) return
    const observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        fetchData();
      };
    }, { threshold: 1 })
    observer?.observe(pageEnd.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const fetchData = async () => {
    const data = await AxiosAPI.get(`/api/newfeeds?id=${id}&page=${numer.current}`); 
    const dataSelector = data.data.data.items;
    
    numer.current += 1
    if (datas.length >= data.data.data.total) {
      return setLoading(false);
    };

    if (datas.length === 0) {
      setData(dataSelector);
    } else {
      setData((value) => [...value, ...dataSelector]);
    };
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  };
  
  const pageEnd = useRef();
  if (datas.length === 0) return <LoadingSvg />
  return (
    <div className="h-full">
      {nation === "Viet-Nam" && (
        <>
          <ArtistSpotlight />
          <div className="!mb-[40px]" />
        </>
      )}
      <div className="relative ">
        <Masonry columns={col} spacing={0}>
          {datas.map((e) => (
            <FollowItems key={uuidv4()} data={e} />
          ))}
        </Masonry>
        <div ref={pageEnd}></div>
        <div className="!mt-[40px] " />
        {loading && <LoadingSvg isLoadMore />}
      </div>
    </div>
  )
};

export default NewFeedPageChidlen
