import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import { useSelector, useDispatch } from "react-redux";
import { setPlay, setReady } from "../../../assets/redux/Features/settingPlayFeatures.js";
import { setDraggItemActive, setDraggUpdateList, setListSongShuffle, setNextSong, setDraggItemActiveShuffle, setDraggUpdateListShuffle, setNextSongShuffle, fetchPlayList } from "../../../assets/redux/Features/QueueFeatures.js";
import ItemRighPlayer from "../Clock-Remove-Item/ItemRighPlayeQueue.jsx";
import RemoveList from "../Clock-Remove-Item/RemoveList.jsx";
import CloclAlarm from "../Clock-Remove-Item/CloclAlarm.jsx";

const BottomRight = memo(() => {
   // Sử dụng hooks để lấy state từ Redux store
   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong);
   const playlistEncodeId = useSelector((state) => state.queueNowPlay.playlistEncodeId);
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent);
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId);
   const recentSongs = useSelector((state) => state.logged.recentSongs);
   const listSong = useSelector((state) => state.queueNowPlay.listSong);
   const isToggle = useSelector((state) => state.toggleright);
   const { isRandom } = useSelector((state) => state.setting);
   // Sử dụng useState để quản lý trạng thái local
   const [toggleSilde, setToggleSilde] = useState(false);
   const [items, setItems] = useState([]);
   const dispatch = useDispatch();
   // Sử dụng useRef để lưu trữ tham chiếu không thay đổi giữa các render
   const itemsRef = useRef([]);
   // Hàm để sắp xếp lại các item khi thực hiện kéo thả
   const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
   };
   // Callback được gọi khi hoàn thành việc kéo thả
   const onDragEnd = useCallback((result) => {
      if (!result.destination) return;
      const reorderedItems = reorder(itemsRef.current, result.source.index, result.destination.index);
      const indexActive = reorderedItems.find((e) => e.encodeId === currentEncodeId);
      const setDragAction = isRandom ? setDraggItemActiveShuffle : setDraggItemActive;
      const setUpdateListAction = isRandom ? setDraggUpdateListShuffle : setDraggUpdateList;
      const setNextSongAction = isRandom ? setNextSongShuffle : setNextSong;
      // Cập nhật state và dispatch action tương ứng
      if (result.source.index === currentIndexSong) {
         dispatch(setDragAction(result.destination.index));
      };
      dispatch(setNextSongAction(reorderedItems.indexOf(indexActive)));
      dispatch(setUpdateListAction(reorderedItems));
      setItems(reorderedItems);
   }, [currentEncodeId, currentIndexSong, dispatch, isRandom]);
   // Effect để cập nhật items khi danh sách bài hát thay đổi
   useEffect(() => {
      if (listSong.length > 0) {
         setItems(listSong);
         itemsRef.current = listSong;
      };
   }, [listSong]);
   // Effect để xử lý logic khi chế độ phát nhạc thay đổi
   useEffect(() => {
      if (isRandom && listSong.length > 0) {
         const arrNext = listSong.filter((e) => e.encodeId !== infoSongCurrent.encodeId);
         const arrShuffle = [infoSongCurrent, ...arrNext.sort(() => Math.random() - 0.5)];
         dispatch(setListSongShuffle(arrShuffle));
         setItems(arrShuffle);
         itemsRef.current = arrShuffle;
      };
      if (!isRandom) {
         setItems(listSong);
         itemsRef.current = listSong;
         dispatch(setNextSong(listSong.indexOf(infoSongCurrent)));
      };
   }, [isRandom, playlistEncodeId, infoSongCurrent.encodeId, dispatch, listSong]);
   // Effect để cuộn đến vị trí của item đang chơi khi thay đổi
   useEffect(() => {
      if (currentEncodeId) {
         const node = document.querySelector(`div[data-rbd-draggable-id='${currentEncodeId}']`);
         if (node) {
            setTimeout(() => scrollIntoView(node, {
               block: "center",
               behavior: "smooth",
               scrollMode: "if-needed",
            }), 200);
         };
      };
   }, [currentEncodeId]);
   // Trả về giao diện của component
   return (
      <div className={`player_queue ${isToggle ? "player_queue-is_active" : ""}`}>
         <div className="player_queue-main">
            <div className="player_queue-header gap-1">
               <div className="queue_list-history">
                  <div onClick={() => setToggleSilde(false)} className={`queue_list ${!toggleSilde && "queue_active-top"}`}>
                     Danh sách phát
                  </div>
                  <div onClick={() => setToggleSilde(true)} className={`queue_histrory ${toggleSilde && "queue_active-top"}`}>
                     Nghe gần đây
                  </div>
               </div>
               <div className="queue_list-btn">
                  <CloclAlarm />
                  <RemoveList />
               </div>
            </div>
            <div className="player_queue-container">
               {/* Hiển thị danh sách bài hát */}
               {currentEncodeId && !toggleSilde && (
                  <DragDropContext onDragEnd={onDragEnd}>
                     <Droppable droppableId="droppable">
                        {(provided) => (
                           <ul className="player_queue-listmusic" {...provided.droppableProps} ref={(el) => { provided.innerRef(el) }}>
                              {items && items.length > 0 && items.map((e, index) => (
                                 <ItemRighPlayer lastIndex={index + 1 === items.length} key={e.encodeId || e.id} index={index} data={e} />
                              ))}
                              {provided.placeholder}
                           </ul>
                        )}
                     </Droppable>
                  </DragDropContext>
               )}

               {/* Hiển thị danh sách bài hát gần đây */}
               {toggleSilde && currentEncodeId && (
                  <ul className="player_queue-listmusic">
                     {recentSongs && recentSongs.length > 0 && recentSongs.map((e, index) => (
                        <ItemRighPlayer setToggleSilde={setToggleSilde} items={items} key={e.encodeId || e.id} index={index} isHistory={true} data={e} />
                     ))}
                  </ul>
               )}

               {/* Hiển thị thông báo khi không có bài hát nào */}
               {!currentEncodeId && (
                  <ul className="player_queue-listmusic">
                     <div className="empty">
                        <div className="empty-img" />
                     </div>
                     <div className="empty-queue">
                        <div className="content">Khám phá thêm các bài hát mới của BlackCat-Club</div>
                        <button
                           onClick={() => {
                              dispatch(setReady(false));
                              dispatch(setPlay(false));
                              dispatch(fetchPlayList("ZO68OC68"));
                              dispatch(setPlay(true));
                           }}
                           className="empty-queue-btn"
                        >
                           <span className="material-symbols-outlined">play_arrow</span>
                           <span>Phát nhạc mới phát hành</span>
                        </button>
                     </div>
                  </ul>
               )}
            </div>
         </div>
      </div>
   );
});

export default BottomRight;

