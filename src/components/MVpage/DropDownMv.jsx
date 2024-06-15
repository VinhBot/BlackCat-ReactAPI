import React, { memo, useState, useLayoutEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "../../assets/redux/Features/MvStateFeatures.js";
import { AxiosAPI } from "../../assets/api.js"

const DropDownMv = memo(() => {
   const count = useSelector((state) => state.setTextBtn);
   const [open, setOpen] = useState(false);
   const [datas, setData] = useState([]);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();
   
   const fetchData = useCallback(async () => {
      const dataSelector = await AxiosAPI.getCategoryMv(id);
      setData(dataSelector);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useLayoutEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useLayoutEffect(() => {
      if (id === "IWZ9Z08I" || id === "IWZ9Z08O" || id === "IWZ9Z08W" || id === "IWZ9Z086") {
         dispatch(setText("Tất Cả"));
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   const handleClick = useCallback((e) => {
      dispatch(setText(e.title));
      navigate(`/mv/${e.id}`, { state: true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="main_mv-search-dropdown">
         <Tippy
            animation={"perspective-extreme"}
            onClickOutside={() => setOpen(false)}
            visible={open}
            content={
               <div id="mainMvList" className="main_mv-dropdown-list">
                  {datas?.childs?.map((e) => (
                     <div onClick={() => handleClick(e)} key={uuidv4()} className="main_mv-dropdown-item">
                        {e.title || e.name}
                     </div>
                  ))}
               </div>
            }
            interactive={true}
            arrow={false}
            offset={[0, 10]}
            placement={"bottom-start"}
         >
            <div onClick={() => setOpen((value) => !value)} className="main_mv-search-dropdown-btn ">
               <span className="material-icons-outlined">music_note</span>
               <p>{count}</p>
               {open ? (<span className="material-icons-outlined up">expand_less</span>) : (<span className="material-icons-outlined down">expand_more</span>)}
            </div>
         </Tippy>
      </div>
   );
});

export default DropDownMv;
