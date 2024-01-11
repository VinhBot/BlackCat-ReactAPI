import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
// import Masonry from "@mui/lab/Masonry";
import { v4 as uuidv4 } from "uuid";

import ArtistSpotlight from "../SliderHome/ArtistSpotlight";
import { LoadingSvg } from "../loading/LoadingSvg";
import { useWindowSize } from "../layout/Hook";
import { AxiosAPI } from "../../assets/api.js";
import FollowItems from "./FollowItems";

const Masonry = React.forwardRef(function(props, ref) {
  // Hàm tiện ích để chuyển đổi giá trị sang số
  const parseToNumber = (val) => Number(val.replace('px', ''));
  // Hàm tiện ích để lấy các lớp tiện ích của Masonry
  const getMasonryUtilityClass = (slot) => `MuiMasonry-${slot}`;
  // Giải gỡ các props và thiết lập giá trị mặc định
  const {
    children,
    className,
    component: Component = 'div',
    columns = 4,
    spacing = 1,
    defaultColumns,
    defaultHeight,
    defaultSpacing,
    ...other
  } = props;
  // Trạng thái để theo dõi chiều cao cột tối đa
  const [maxColumnHeight, setMaxColumnHeight] = React.useState();
  // Trạng thái để theo dõi số lượng dòng ngắt
  const [numberOfLineBreaks, setNumberOfLineBreaks] = React.useState(
    // Đặt số lượng dòng ngắt ban đầu dựa trên giá trị mặc định
    !maxColumnHeight && defaultHeight && defaultColumns !== undefined && defaultSpacing !== undefined ? defaultColumns - 1 : 0
  );
  // Ref cho component Masonry
  const masonryRef = React.useRef();
  // Hiệu ứng để xử lý sự kiện resize
  React.useEffect(() => {
    const handleResize = () => {
      if (!masonryRef.current) return;
      const masonry = masonryRef.current;
      // Kiểm tra nếu cả parent và first child có chiều rộng bằng 0
      if (masonry.clientWidth === 0 || masonryRef.current.firstChild.clientWidth === 0) return;
      // Khởi tạo mảng để theo dõi chiều cao của các cột
      const columnHeights = new Array(columns).fill(0);
      // Lặp qua các child của Masonry để tính toán chiều cao của các cột
      masonry.childNodes.forEach((child) => {
        if (child.nodeType !== Node.ELEMENT_NODE || child.dataset.class === 'line-break') return;
        const currentMinColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        const childComputedStyle = window.getComputedStyle(child);
        const childMarginTop = parseToNumber(childComputedStyle.marginTop);
        const childMarginBottom = parseToNumber(childComputedStyle.marginBottom);
        // Cập nhật chiều cao của cột với chiều cao của child hiện tại
        columnHeights[currentMinColumnIndex] += parseToNumber(childComputedStyle.height) + childMarginTop + childMarginBottom || 0;
        // Đặt thứ tự của child dựa trên chỉ số của cột
        child.style.order = currentMinColumnIndex + 1;
      });
      // Cập nhật trạng thái với chiều cao cột tối đa và số lượng dòng ngắt
      setMaxColumnHeight(Math.max(...columnHeights));
      setNumberOfLineBreaks(columns > 0 ? columns - 1 : 0);
    };

    // Tạo một ResizeObserver để quan sát sự kiện resize
    const resizeObserver = new ResizeObserver(handleResize);
    if (masonryRef.current) {
      // Quan sát từng child node trong Masonry
      masonryRef.current.childNodes.forEach((childNode) => {
        resizeObserver.observe(childNode);
      });
    };
    // Hàm cleanup để ngắt kết nối ResizeObserver
    return () => resizeObserver.disconnect();
  }, [columns, spacing, children]);
  // Hàm xử lý ref của component Masonry
  const handleRef = (node) => {
    masonryRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };
  // Tạo một mảng dòng ngắt dựa trên số lượng dòng ngắt
  const lineBreaks = new Array(numberOfLineBreaks).fill('').map((_, index) => (
    <span key={index} data-class={getMasonryUtilityClass('line-break')} style={{ ...lineBreakStyle, order: index + 1 }} />
  ));
  // Render component Masonry
  return (
    <Component
      ref={handleRef}
      className={`${getMasonryUtilityClass('root')} ${className || ''}`}
      {...other}
      style={{
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        '& > *': {
          boxSizing: 'border-box'
        },
        ...other.style
      }}
    >
      {children}
      {lineBreaks}
    </Component>
  );
});

const NewFeedPageChidlen = () => {
  const { nation, id } = useParams();
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const numer = useRef(1);
  let col = 3;
  const { width } = useWindowSize();
  if (width <= 1400) {
    col = 2;
  };
  if (width <= 600) {
    col = 1;
  };
  useLayoutEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading) return
    const observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        fetchData();
      };
    }, { threshold: 1 })
    observer?.observe(pageEnd.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const fetchData = async () => {
    const data = await AxiosAPI.getNewFeed(id, numer.current);
    const dataSelector = data.data.data.items;
    
    numer.current += 1
    if (datas.length >= data.data.data.total) {
      return setLoading(false);
    };

    if (datas.length === 0) {
      setData(dataSelector);
    } else {
      setData((value) => [...value, ...dataSelector]);
    };
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  };
  
  const pageEnd = useRef();
  if (datas.length === 0) return <LoadingSvg />
  return (
    <div className="h-full">
      {nation === "Viet-Nam" && (
        <>
          <ArtistSpotlight />
          <div className="!mb-[40px]" />
        </>
      )}
      <div className="relative ">
        <Masonry columns={col} spacing={0}>
          {datas.map((e) => (
            <FollowItems key={uuidv4()} data={e} />
          ))}
        </Masonry>
        <div ref={pageEnd}></div>
        <div className="!mt-[40px] " />
        {loading && <LoadingSvg isLoadMore />}
      </div>
    </div>
  )
};

export default NewFeedPageChidlen
