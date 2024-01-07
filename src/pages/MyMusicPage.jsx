import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { AxiosAPI } from "../assets/api.js";

const MyMusicPage = memo(() => {
   const { pathname } = useLocation();
   const [docs, setDocs] = useState();
   const navigate = useNavigate();
   const users = useSelector((state) => state.auth);

   const project = [
     { name: "TỔNG QUAN", path: "/mymusic/" },
     { name: "BÀI HÁT", path: "/mymusic/song" },
     { name: "PLAYLIST", path: "/mymusic/playlist" },
     { name: "NGHỆ SĨ", path: "/mymusic/nghe-si" },
     { name: "Thông tin", path: "/mymusic/info" },
   ];

   useEffect(() => {
      if (!users.activeUser) {
         navigate("/auth");
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      const fetchData = async() => {
         const data = await AxiosAPI.get(`/user/finduser/${users.username}`);
         setDocs(data.data.data);
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   
   return (
      <div className="main_personal text-white">
         <div className="personal_user">
            <div className="personal_user-img w-[60px] h-[60px] shadow-sm border border-dashed ">
               <figure>
                  <img className="object-cover h-[60px]" src={users.profileImage ? users.profileImage : "https://avatar.talk.zdn.vn/default"} alt="" />
               </figure>
            </div>
            <h3>{users.name}</h3>
         </div>

         <div className="flex items-center min-h-[52px] my-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
              {project.map(({ name, path }, index) => (
                <li key={index} className={`zm-navbar-item ${pathname === path ? "is-active" : ""}`}>
                  <div className="navbar-link">
                     <Link to={path}>{name}</Link>
                  </div>
                </li>
              ))}
            </ul>
         </div>
         <Outlet context={{ docs }}/>
      </div>
   );
});

export default MyMusicPage;