import React, { memo } from "react";
import { Link } from "react-router-dom";

const NotFound = memo(() => {
   return (
      <center>
        <Link className="cursor-pointer" to="/">
          <p style={{ color: "red" }}>HomePage</p>
        </Link>
      </center>
   );
});

export default NotFound;