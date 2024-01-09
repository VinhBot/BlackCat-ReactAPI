import React, { memo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { LyricStyled as LyricStyleds } from "../../../assets/styledComponents";

const ItemLyricKaraoke = memo(({ data }) => {
   // Lấy thời điểm hiện tại từ Redux state
   const current = useSelector((state) => state.queueNowPlay.currentTime);
   // Sử dụng useRef để tham chiếu đến thanh tiến trình (progress bar)
   const progressBar = useRef(null);
   // Tạo chuỗi văn bản từ mảng các từ
   let text = data?.words?.map((e) => e.data).join(" ") || "";
   // Lấy thời điểm bắt đầu và kết thúc của đoạn văn bản
   let startTime = data?.words?.[0]?.startTime / 1000 || 0;
   let endTime = data?.words?.[data.words.length - 1]?.endTime / 1000 || 0;
   // Sử dụng useEffect để theo dõi thay đổi trong thời gian hiện tại
   useEffect(() => {
      // Kiểm tra nếu thời điểm hiện tại nằm trong khoảng thời gian của đoạn văn bản
      if (current >= startTime && current <= endTime) {
         // Tính toán tỷ lệ tiến trình và cập nhật thanh tiến trình
         progressBar.current.style.width = Math.min(Math.max((100 / (endTime - startTime)) * (endTime - current) - 100 * -1 + 3, 0), 100) + "%";
      } else if (current < startTime) {
         // Nếu thời điểm hiện tại nhỏ hơn thời điểm bắt đầu, đặt thanh tiến trình về 0%
         progressBar.current.style.width = 0 + "%";
      }
   }, [current, startTime, endTime]);
   // Kiểm tra nếu không có dữ liệu, trả về null
   if (!data) return null;
   // Trả về JSX của một mục văn bản karaoke
   return (
      <LyricStyleds className={`item`}>
         <span>
            {text}
            {/* Sử dụng thanh tiến trình để làm nổi bật văn bản karaoke */}
            <span ref={progressBar} className="kara-text-highlight">
               {text}
            </span>
         </span>
      </LyricStyleds>
   );
});

export default ItemLyricKaraoke;
