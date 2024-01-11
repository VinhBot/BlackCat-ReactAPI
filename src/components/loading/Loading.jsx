import { Outlet } from "react-router-dom/dist";
import React from "react";
import { LoadingPage } from "./LoadingSvg.jsx";

const Loading = () => {
  return (
    <>
      <React.Suspense fallback={<LoadingPage pathOption={0} />}>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default Loading;