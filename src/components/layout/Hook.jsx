import { useCallback, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AxiosAPI } from "../../assets/api.js";
// // Usage

// function App() {
//    const size = useWindowSize()
//    return (
//       <div>
//          {size.width}px / {size.height}px
//       </div>
//    )
// }

// Hook
export function useWindowSize() {
   const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
   });
   useMemo(() => {
      function handleResize() {
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
   }, []);
   return windowSize;
};
//==============================================================================
// function App() {
//    const [isTextChanged, setIsTextChanged] = useToggle()
//    return <button onClick={setIsTextChanged}>{isTextChanged ? "Toggled" : "Click to Toggle"}</button>
// }
// Hook
// Tham số là boolean, với giá trị mặc định là "false"

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};
 
//==============================================================================
// Định nghĩa một hook tùy chỉnh để quản lý việc thích dựa trên mục và loại
export const useLikeHook = (item, type) => {
   // Lấy thông tin người dùng từ trạng thái Redux
   const users = useSelector((state) => state.auth);
   // Trạng thái để theo dõi liệu mục có được thích hay không
   const [isLike, setLike] = useState(false);
   // Hiệu ứng được memoize để kiểm tra xem người dùng hiện tại đã thích mục này chưa
   useMemo(() => {
      // Kiểm tra xem có người dùng đang hoạt động không
      if (users.activeUser) {
         // Thực hiện yêu cầu POST đến máy chủ để lấy dữ liệu người dùng
         AxiosAPI.getUserLikeEndpoint(users.username).then((response) => {
            const user = response.data.data;
            // Nếu không có dữ liệu người dùng, thoát
            if (!user) return;
            let likeSelector;
            // Xác định loại và tìm mục trong nội dung yêu thích của người dùng
            if (type === 1) {
               likeSelector = user.favouritePlaylist.find((e) => e?.encodeId === item?.encodeId);
            } else if (type === 2) {
               likeSelector = user.favouriteSongs.find((e) => e?.encodeId === item?.encodeId);
            } else if (type === 3) {
               likeSelector = user.favouriteArtist.find((e) => e?.id === item?.id);
            };
            // Cập nhật trạng thái dựa trên việc mục có được thích hay không
            setLike(!!likeSelector);
         }).catch((error) => {
            // Ghi log và xử lý lỗi
            console.error(error);
         });
      };
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [item]);
   // Hàm để xử lý việc thích hoặc bỏ thích một mục
   const handleLike = () => {
      // Kiểm tra xem có người dùng đang hoạt động không
      if (!users.activeUser) {
         // Hiển thị thông báo nếu người dùng chưa đăng nhập
         return toast("Bạn cần phải đăng nhập", {
            type: "info",
         });
      };
      // Nếu có người dùng đang hoạt động
      if (users.activeUser) {
         // Nếu mục chưa được thích, thực hiện yêu cầu POST để thích nó
         if (!isLike) {
            AxiosAPI.getUserLikeEndpoint(users.username, {
               type: type,
               item: item
            }).then(() => {
               toast("Thêm vào thư viện thành công", { type: "success" });
               setLike(true);
            }).catch((error) => {
               // Ghi log và xử lý lỗi
               console.error(error);
               toast("Lỗi thêm vào thư viện không thành công", { type: "error" });
            });
         };
         // Nếu mục đã được thích, thực hiện yêu cầu POST để bỏ thích
         if (isLike) {
            AxiosAPI.getUserLikeEndpoint(users.username, {
               type: type,
               item: item
            }).then(() => {
               toast("Xóa khỏi thư viện thành công", { type: "info" });
               setLike(false);
            }).catch((error) => {
               // Ghi log và xử lý lỗi
               console.error(error);
               toast("Lỗi xóa khỏi thư viện", { type: "error" });
            });
         };
      };
   };
   // Trả về trạng thái thích hiện tại và hàm để xử lý thích
   return { isLike, handleLike };
};
//==============================================================================
