import { styled, keyframes } from '@mui/system';
import { Outlet } from "react-router-dom/dist";
import React, { memo } from "react";

const LoadingInit = memo(() => {
  const spin1 = keyframes({
    "0%": {
      "webkitTransform": "rotate(0deg)",
      "msTransform": "rotate(0deg)",
      "transform": "rotate(0deg)"
    },
    "100%": {
      "webkitTransform": "rotate(360deg)",
      "msTransform": "rotate(360deg)",
      "transform": "rotate(360deg)"
    }
  });
  const spin2 = keyframes({
    "0%": {
      "webkitTransform": "rotate(0deg)",
      "msTransform": "rotate(0deg)",
      "transform": "rotate(0deg)",
    },
    "100%": {
      "webkitTransform": "rotate(360deg)",
      "msTransform": "rotate(360deg)",
      "transform": "rotate(360deg)"
    }
  });
  const Preloader = styled("div")({
    "position": "fixed",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "z-index": 9999,
    "overflow": "hidden",
    "background": "#303030",
    "div": {
      "display": "block",
      "position": "relative",
      "left": "50%",
      "top": "50%",
      "width": "150px",
      "height": "150px",
      "margin": "-75px 0 0 -75px",
      "borderRadius": "50%",
      "border": "3px solid transparent",
      "borderTopColor": "#9370DB",
      "webkitAnimation": `${spin1} 2s linear infinite`,
      "animation": `${spin2} 2s linear infinite`,
      "&:before": {
        "content": "''",
        "position": "absolute",
        "top": "5px",
        "left": "5px",
        "right": "5px",
        "bottom": "5px",
        "borderRadius": "50%",
        "border": "3px solid transparent",
        "borderTopColor": "#BA55D3",
        "webkitAnimation": `${spin1} 3s linear infinite`,
        "animation": `${spin2} 3s linear infinite`,
      },
      "&:after": {
        "content": "''",
        "position": "absolute",
        "top": "15px",
        "left": "15px",
        "right": "15px",
        "bottom": "15px",
        "borderRadius": "50%",
        "border": "3px solid transparent",
        "borderTopColor": "#FF00FF",
        "webkitAnimation": `${spin1} 1.5s linear infinite`,
        "animation": `${spin2} 1.5s linear infinite`,
      }
    }
  });
  return (
    <Preloader>
      <div></div>
    </Preloader>
  );
});

const Loading = () => {
  return (
    <>
      <React.Suspense fallback={<LoadingInit />}>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default Loading;