import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { database } from "../assets/firebase/firebase-config.js";

const MyMusicPage = memo(() => {
   const users = useSelector((state) => state.auth);
   const { pathname } = useLocation();
   const [docs, setDocs] = useState();
   const navigate = useNavigate();
   
   useEffect(() => {
      if (!users.activeUser) {
         navigate("/auth");
      };
   }, []);

   useEffect(() => {
      if (users.activeUser) {
         getDoc(doc(database, "blackcat-account", users.uid)).then((value) => {
            setDocs(value.data());
         });
      };
   }, []);

   const project = [
      { name: "TỔNG QUAN", path: "/mymusic/" },
      { name: "BÀI HÁT", path: "/mymusic/song" },
      { name: "PLAYLIST", path: "/mymusic/playlist" },
      { name: "NGHỆ SĨ", path: "/mymusic/nghe-si" },
      { name: "Thông tin", path: "/mymusic/info" },
   ];
   return (
      <div className="main_personal text-white">
         <div className="personal_user">
            <div className="personal_user-img w-[60px] h-[60px] shadow-sm border border-dashed ">
               <figure>
                  <img className="h-[60px]" src={users.profileImage ? users.profileImage : "https://avatar.talk.zdn.vn/default"} alt="" />
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
         <Outlet context={{ docs }} />
      </div>
   );
});

export default MyMusicPage;