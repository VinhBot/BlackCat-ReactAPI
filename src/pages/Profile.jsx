import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const Profile = React.memo(() => {
  const users = useSelector((state) => state.auth);
  return (
    <div className="main-page-item active">
      <p>
        name: {users.displayName ? users.displayName : "none"}
      </p>
    </div>
  );
});

export default Profile; 