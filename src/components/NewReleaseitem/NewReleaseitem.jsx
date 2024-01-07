import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getFormartMiute,
  getConterTimeRelese,
  getFormartTimeDDYY
} from "../../assets/functions.js"

import { toast } from "react-toastify";
import ActionPlay from "../Icon/ActionPlay";
import ActionIcon from "../Icon/ActionIcon";
import LoadingIcon from "../Icon/LoadingIcon";
import { setPlay, setReady } from "../../assets/redux/Features/settingPlayFeatures.js";
import {
  fetchPlayList,
  playSongNotAlbum,
} from "../../assets/redux/Features/QueueFeatures.js";
import { pushPlayListsLogged } from "../../assets/redux/Features/loggedFeatures.js";
import { useLikeHook } from "../layout/Hook";

import { NewReleaseItemStyle } from "../../assets/styledComponents";



const NewReleaseitem = memo(({ isRadio, isDisk, classDisk, item, isArtist }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { isLike, handleLike } = useLikeHook(item, isDisk ? 1 : 2);
  const img = item?.thumbnailM?.slice(item?.thumbnailM.lastIndexOf("/"));
  const timeRelease = getConterTimeRelese(item?.releaseDate, item?.isAlbum);
  const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId);
  const playlistEncodeId = useSelector((state) => state.queueNowPlay.playlistEncodeId);
  const { playing, isReady } = useSelector((state) => state.setting);
  let active = item?.encodeId === currentEncodeId;
  let activeAlbum = playlistEncodeId === item?.encodeId;

  return (
    <NewReleaseItemStyle className={`player_queue-item ${activeAlbum ? "active-album" : ""} ${active ? "active" : ""} ${isArtist ? "is-artist" : ""}  ${isDisk ? "is-disk" : ""}`}>
      <div className="player_queue-item-left">
        <div className="relative z-[1]">
          <div className="player_queue-left">
            {!isArtist && (<LazyLoadImage visibleByDefault={item?.thumbnailM === img} className="player_queue-img" src={item?.thumbnailM} alt="" />)}
            {isArtist && (<LazyLoadImage className="player_queue-img" src={item?.thumbnailM} alt="" />)}
            <div
              onClick={(e) => {
                if (!isDisk) return;
                if (e.target.className.includes("player_queue-img-hover")) {
                  navigate(`/album/${item?.encodeId}`);
                }
              }}
              className="player_queue-img-hover"
            >
              {!active && !activeAlbum && (
                <span
                  onClick={() => {
                    if(item?.streamingStatus === 2) {
                      return toast("Dành Cho Tài Khoản VIP", {
                        type: "info",
                      });
                    }
                    if(isRadio) {
                      return toast("Radio đang phát triển, vui lòng thông cảm !", {
                          type: "info",
                      });
                    }
                    if (isArtist) {
                      const handele = async () => {
                        dispatch(setReady(false));
                        dispatch(setPlay(false));
                        await dispatch(fetchPlayList(item?.encodeId));
                        dispatch(setPlay(true));
                      };
                      handele();
                    }

                    if (!isDisk) {
                      const hi = async () => {
                        dispatch(setReady(false));
                        dispatch(setPlay(false));
                        await dispatch(playSongNotAlbum(item));
                        dispatch(setPlay(true));
                      };
                      hi();
                    }

                    if(isDisk) {
                      const handele = async() => {
                        navigate(`/album/${item?.encodeId}`);
                        dispatch(setReady(false));
                        dispatch(setPlay(false));
                        await dispatch(fetchPlayList(item?.encodeId));
                        dispatch(setPlay(true));
                        if (item.textType === "Playlist") {
                          dispatch(pushPlayListsLogged(item));
                        }
                      };
                      handele();
                    }
                  }}
                >
                  <i className="icon action-play ic-play" />
                </span>
              )}
              {(active || activeAlbum) && (
                <>
                  {isReady && (
                    <>
                      {!playing && (
                        <span onClick={() => dispatch(setPlay(true))}>
                          <ActionPlay/>
                        </span>
                      )}
                      {playing && (
                        <span onClick={() => dispatch(setPlay(false))}>
                          <ActionIcon/>
                        </span>
                      )}
                    </>
                  )}

                  {!isReady && <LoadingIcon notLoading/>}
                </>
              )}
            </div>
          </div>

          {isDisk && (
            <figure className={`image disk ${classDisk ? classDisk : ""}`}>
              <LazyLoadImage src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/album-disk.png" alt=""/>
            </figure>
          )}
        </div>
        <div className={`player_queue-music-info ${item?.streamingStatus === 1 ? "" : item?.streamingStatus === 2 ? "is-vip" : ""}`}>
          {!isArtist && (
            <div className="player_queue-music">
              {item?.title} <div className="is-vip_img"></div>
            </div>
          )}

          {!isRadio && !isArtist && (
            <>
              <div className="player_queue-name">
                {item?.artists && item?.artists?.slice(0, 3)?.map((e, index) => {
                    let prara = ", ";
                    if (index === 2) {
                      prara = "...";
                    }
                    if (item?.artists?.length === 1) {
                      prara = "";
                    }
                    if (item?.artists?.length === 2 && index === 1) {
                      prara = "";
                    }
                    if (item?.artists?.length === 3 && index === 2) {
                      prara = "";
                    }
                    return (
                      <span key={index}>
                        <Link to={`/nghe-si/${e.alias}/`}>{e.name}</Link>
                        {prara}
                      </span>
                    );
                  })}
              </div>
              <div className="player_queue-time">{timeRelease} trước</div>
            </>
          )}
          {isRadio && (
            <>
              <div className="player_queue-name">
                {item?.album?.title || ""}
              </div>
              <div className="player_queue-time">
                {getFormartTimeDDYY(item?.releaseDate)} •{" "}
                {getFormartMiute(item?.duration)} phút
              </div>
            </>
          )}
          {isArtist && (
            <div className="media-content">
              <p>Mới Nhất</p>
              <h3 className="player_queue-music">{item?.title}</h3>
              <h4 className="subtitle">{item?.releaseDate}</h4>
            </div>
          )}
        </div>
      </div>
      {!isRadio && !isArtist && (
        <div className="player_queue-item-right">
          <div onClick={handleLike} className="player_queue-btn player_btn zm-btn">
            <i className={`icon  ${isLike ? "ic-like-full" : "ic-like"} `}></i>
            <span className="playing_title-hover">
              {" "}
              {isLike ? " Xóa khỏi " : "Thêm vào"} thư viện{" "}
            </span>
          </div>
          <div className="player_queue-btn player_btn zm-btn">
            <i className="icon ic-more" />
            <span className="playing_title-hover">Xem thêm</span>
          </div>
        </div>
      )}
    </NewReleaseItemStyle>
  );
});

export default NewReleaseitem;