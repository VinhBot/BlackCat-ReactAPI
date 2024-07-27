import { arrayRemove, arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import React from "react";
import { database } from "../../assets/firebase-config.js";
// Hook
export function useWindowSize() {
   // function App() {
   //    const size = useWindowSize()
   //    return (
   //       <div>
   //          {size.width}px / {size.height}px
   //       </div>
   //    )
   // }
   const [windowSize, setWindowSize] = React.useState({
      width: undefined,
      height: undefined,
   });
   React.useMemo(() => {
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
   const [state, setState] = React.useState(initialState);
   const toggle = React.useCallback(() => setState((state) => !state), []);
   return [state, toggle];
};
//==============================================================================
// Định nghĩa một hook tùy chỉnh để quản lý việc thích dựa trên mục và loại
export const useLikeHook = (item, type) => {
   // Lấy thông tin người dùng từ trạng thái Redux
   const { uid, activeUser } = useSelector((state) => state.auth);
   // Trạng thái để theo dõi liệu mục có được thích hay không
   const [isLike, setLike] = React.useState(false);
   // Trạng thái để lưu trữ dữ liệu người dùng
   const [docs, setDocs] = React.useState([]);
   // Hiệu ứng dùng để kiểm tra trạng thái thích của mục hiện tại
   React.useEffect(() => {
      const fetchLikeStatus = async () => {
         if (activeUser) {
            try {
               // Lấy tài liệu của người dùng từ cơ sở dữ liệu
               const docSnap = await getDoc(doc(database, 'blackcat-account', uid));
               if (!docSnap.exists()) return;
               const userData = docSnap.data();
               let likeSelector = null;
               // Kiểm tra xem mục hiện tại có được người dùng thích hay không
               switch (type) {
                  case 1:
                     likeSelector = userData.favouritePlaylist.find((e) => e?.encodeId === item?.encodeId);
                     break;
                  case 2:
                     likeSelector = userData.favouriteSongs.find((e) => e?.encodeId === item?.encodeId);
                     break;
                  case 3:
                     likeSelector = userData.favouriteArtist.find((e) => e?.id === item?.id);
                     break;
                  default:
                     break;
               };
               // Cập nhật trạng thái và dữ liệu
               setDocs(userData);
               setLike(!!likeSelector);
            } catch (error) {
               console.error('Lỗi tìm nạp như trạng thái:', error);
            };
         };
      };
      fetchLikeStatus();
   }, [item, type, uid, activeUser]);
   // Hàm chung để cập nhật trạng thái thích hoặc bỏ thích
   const updateLikeStatus = async (updateAction, successMessage, errorMessage) => {
      try {
         await updateAction(doc(database, 'blackcat-account', uid));
         toast.success(successMessage);
      } catch (error) {
         console.error(error);
         toast.error(errorMessage);
      };
   };
   // Hàm để xử lý việc thích hoặc bỏ thích một mục
   const handleLike = () => {
      if (!activeUser) return toast.info("Bạn cần phải đăng nhập");
      if (isLike) {
         // Nếu mục đã được thích, thực hiện bỏ thích
         updateLikeStatus(async (colRef) => {
            switch (type) {
               case 1:
                  await updateDoc(colRef, {
                     favouritePlaylist: arrayRemove(item)
                  });
                  break;
               case 2:
                  await updateDoc(colRef, {
                     favouriteSongs: arrayRemove(item)
                  });
                  break;
               case 3:
                  await updateDoc(colRef, {
                     favouriteArtist: arrayRemove(docs.favouriteArtist.find((e) => e.id === item.id))
                  });
                  break;
               default:
                  break;
            };
            setLike(false);
         }, "Xóa khỏi thư viện thành công", "Lỗi xóa khỏi thư viện");
      } else {
         // Nếu mục chưa được thích, thực hiện thêm thích
         updateLikeStatus(async (colRef) => {
            switch (type) {
               case 1:
                  await updateDoc(colRef, {
                     favouritePlaylist: arrayUnion(item)
                  });
                  break;
               case 2:
                  await updateDoc(colRef, {
                     favouriteSongs: arrayUnion(item)
                  });
                  break;
               case 3:
                  await updateDoc(colRef, {
                     favouriteArtist: arrayUnion(item)
                  });
                  break;
               default:
                  break;
            };
            setLike(true);
         }, "Thêm vào thư viện thành công", "Lỗi thêm vào thư viện");
      };
   };
   // Trả về trạng thái thích hiện tại và hàm để xử lý thích
   return { isLike, handleLike };
};