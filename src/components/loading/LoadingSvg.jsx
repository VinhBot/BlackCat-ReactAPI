import React, { memo } from "react";
import loading from "./loading.gif";

export const LoadingSvg = memo(({ isLoadMore }) => {
   return (
      <div className={`loading ${isLoadMore ? "relative mt-5" : "absolute"}`}>
        <span className="loader"/>
      </div>
   );
});

export const LoadingImage = memo(({ isLoadMore, image }) => {
  const loadingData = [
    { path: loading },
  ];
  return (
    <div className={`loading ${isLoadMore ? "relative mt-5" : "absolute"}`}>
      <img style={{ width: "50px" }} src={loadingData[image].path} alt="" />
    </div>
  );
});

export const LoadingPage = memo(({ isLoadMore, pathOption }) => {
  const optionData = [
    { path: loading }, // 0
  ];
  return (
    <div className={`loading ${isLoadMore ? "relative mt-5" : "absolute"}`}>
      <img style={{ width: "50px" }} src={optionData[pathOption].path} alt="" />
    </div>
  );
});