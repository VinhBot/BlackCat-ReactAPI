import { useNavigate } from "react-router-dom";
import React from "react";

import { EmptyStyled } from "../../assets/styledComponents";

const EmptyContent = ({ text, textBtn }) => {
   const navigate = useNavigate();
   return (
      <EmptyStyled className="zm-empty">
         <div className={`icon ${"favorite-song"}`}></div>
         <div className="text">{text}</div>
         <button onClick={() => navigate("/moi-phat-hanh")} className="!uppercase is-outlined active is-medium is-upper zm-btn">
            {textBtn}
         </button>
      </EmptyStyled>
   );
};

export default EmptyContent;
