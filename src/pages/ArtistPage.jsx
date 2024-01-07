import React, { useState, useLayoutEffect } from "react";
import { Outlet, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import ArtistInfoTop from "../components/ArtistPage/ArtistInfoTop.jsx";
import {  LoadingSvg } from "../components/loading/LoadingSvg.jsx";
import { ArtistPageStyles } from "../assets/styledComponents.js";
import { scrollTop } from "../assets/functions.js";
import { AxiosAPI } from "../assets/api.js";

const ArtistPage = () => {
   const { name } = useParams();
   const [datas, setData] = useState([]);
   const fetchData = async () => AxiosAPI.get(`/api/artist/${name}`).then((response) => {
      setData(response?.data?.data); // Xử lý dữ liệu khi nhận được response thành công
   }).catch((error) => {
      // Xử lý lỗi nếu có
      console.error("ArtistPage:", error);
   });
   const project = [
     { _name: "TỔNG QUAN", _path: `/nghe-si/${name}/` },
     { _name: "BÀI HÁT", _path: `/nghe-si/${name}/song` },
     { _name: "SINGLE & EP", _path: `/nghe-si/${name}/single` },
     { _name: "ALBUM", _path: `/nghe-si/${name}/album` },
     { _name: "MV", _path: `/nghe-si/${name}/mv` },
   ];
   useLayoutEffect(() => {
      scrollTop();
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   if(datas?.length === 0) return <LoadingSvg/>
   return (
      <ArtistPageStyles className=" mt-5 ">
         <ArtistInfoTop data={datas}/>
         <div className="flex items-center min-h-[52px] mb-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
              {project.map((item, index) => (
                <NavLink key={index} to={item._path} className={(item) => (item.isActive ? "zm-navbar-item is-active" : "zm-navbar-item ")}>
                  <div className="navbar-link">
                     <span>{item._name}</span>
                  </div>
                </NavLink>
              ))}                                                    
            </ul>
         </div>
         <Outlet context={datas} />
      </ArtistPageStyles>
   );
};

export default ArtistPage;