import React, { memo } from "react";
// Import files
import NavLinkArow from "./Navbar/NavLinkArow.jsx";
import HeaderRight from "./Navbar/HeaderRight.jsx";
import ItemLogin from "./Navbar/ItemLogin.jsx";
import NavForm from "./Navbar/NavForm.jsx"; 

const Header = memo(() => {
   return (
      <header className="header">
         <div className="header_content">
            <div className="header_content-btn-user-c">
               <ItemLogin isTitle={false}/>
            </div>
            <div className="header_content-left">
               <NavLinkArow/>
               <NavForm/>
            </div>
            <HeaderRight/>
         </div>
      </header>
   );
});

export default Header;