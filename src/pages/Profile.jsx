import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const Profile = React.memo(() => {
  const users = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Hook để điều hướng trang
  return (
    <div className="main-page-item active">
      <p>
        name: --- 
        <br/>
        age: ----
      </p>
    </div>
  );
});

export default Profile; 