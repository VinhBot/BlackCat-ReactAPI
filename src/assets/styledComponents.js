import styled from "styled-components";
// src\components\NewReleaseitem...
export const NewReleaseItemStyle = styled.div`
   &.active {
      background: var(--alpha-bg);
      transition: 0.2s;
      .player_queue-item-right {
         display: flex !important;
      }
      .player_queue-img-hover {
         visibility: visible !important;
      }
   }
   &.active-album {
      background: var(--alpha-bg);
      transition: 0.2s;
      .player_queue-item-right {
         display: flex !important;
      }
      .player_queue-img-hover {
         visibility: visible !important;
      }
   }

   &.is-artist {
      &:hover {
         background: unset;
         transition: unset;
      }
   }
   .media-content {
      p {
         font-size: 12px;
         font-weight: 500;
         line-height: 1.9;
         color: var(--text-item-hover);
      }
      h3 {
         text-transform: none;
         font-size: 14px;
         font-weight: 500;
         line-height: 1.57;
         margin-bottom: 2px;
      }
      h4 {
         font-size: 12px;
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         max-width: 100%;
         line-height: normal;
      }
   }

   &.is-disk {
      &:hover {
         .disk {
            transform: rotate(90deg);
         }
         .player_queue-left {
            transform: translateX(-10px);
         }
      }
      .player_queue-left {
         min-width: 87px;
         height: 87px;
         margin-left: 1rem;
         margin-right: 2.6rem;
         .player_queue-img-hover {
            min-width: 87px;
            height: 87px;
         }
      }

      .disk {
         width: 87px;
         height: 87px;
         transition: transform 0.3s linear;
         background-color: transparent;
         transform: rotate(0);
         z-index: -1;
         position: absolute;
         top: 0;
         left: 20px;
         right: 0;
         bottom: 0;
      }
   }

   .player_queue-left {
      min-width: 6rem;
      height: 6rem;
      transition: transform 0.3s linear;
      box-shadow: unset;
      .player_queue-img-hover {
         min-width: 6rem;
         height: 6rem;
      }
   }
   .player_queue-name,
   .player_queue-music,
   .player_queue-time {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      height: auto;
      overflow: hidden;
   }

   .player_queue-name {
      margin-top: 3px;

      a:hover {
         text-decoration: underline !important;
         color: var(--link-text-hover);
      }

      &:hover {
         text-decoration: unset !important;
      }
   }
   .player_queue-time {
      font-size: 12px;
      line-height: 18px;
      font-weight: 400;
      color: var(--text-secondary);
      margin-top: 3px;
   }
   .media-content {
      span {
         font-size: 10px;
         font-weight: 500;
         line-height: 1.9;
         color: var(--text-item-hover);
      }
      h3 {
         text-transform: none;
         font-size: 14px;
         font-weight: 500;
         line-height: 1.57;
      }
      h4 {
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         max-width: 100%;
         line-height: normal;
      }
   }
`;
// \src\components\Portal
export const SettingPortalStyles = styled.div`
background-color: var(--primary-bg);
border-radius: 8px;
position: absolute;
box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
width: 240px;
z-index: 101;
top: calc(100% + 8px);
right: 0;
padding-top: 10px;
padding-bottom: 10px;
.menu-list {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: center;
   li.is-active,
   li:hover {
      background-color: var(--alpha-bg);
      color: var(--text-item-hover);
   }
   li {
      width: 100%;
   }

   li a,
   li button {
      font-size: 14px;
      color: var(--navigation-text);
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 12px 20px;
      i {
         margin-right: 10px;
         font-size: 20px;
      }
   }
   li a {
      color: var(--text-secondary);
   }
}
`;

export const SettingPortalChildrenStylle = styled.ul`
   z-index: 111;
   border-radius: 8px;
   width: 274px;
   height: auto;
   padding: 10px 0;
   box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
   background-color: var(--primary-bg);

   li:hover {
      background-color: var(--alpha-bg);
      color: var(--text-item-hover);
   }
   li {
      color: var(--navigation-text);
   }
   .option {
      height: auto;
      padding: 5px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-primary);
      cursor: pointer;
   }
   .option .left {
      width: 87%;
      text-align: left;
   }

   .icon {
      font-size: 20px;
   }
   .desc {
      margin-top: 6px;
      line-height: 1.5;
      font-size: 12px;
      color: var(--text-secondary);
   }
`;

export const PortalStyle = styled.div`
      .theme-modal-overlay {
         position: fixed;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         z-index: 1080;
         display: flex;
         justify-content: center;
         align-items: center;
         background-color: var(--dark-alpha-50);
      }
      .alert-enter {
         opacity: 0;
         transform: scale(0.9);
      }
      .alert-enter-active {
         opacity: 1;
         transform: translateX(0);
         transition: opacity 300ms, transform 300ms;
      }
      .alert-exit {
         opacity: 1;
      }
      .alert-exit-active {
         opacity: 0;
         transform: scale(0.9);
         transition: opacity 300ms, transform 300ms;
      }
      .zm-portal-modal .modal {
         background-color: var(--primary-bg);
         border-radius: 8px;

         max-width: 900px;
         display: flex;
         align-items: center;
         flex-direction: column;
         justify-content: center;
         position: fixed;
         z-index: 40;
      }
      .theme-modal .modal-content {
         width: 70vw;
         max-width: 900px;
         padding-bottom: 20px;
      }
      .modal-content {
         width: 70vw;
         max-width: 900px;
         padding-bottom: 20px;
         position: relative;
      }
      .container {
         flex-grow: 1;
         margin: 0 auto;
         position: relative;
         width: 100%;
         max-height: 50vh;
         min-height: 500px;
         padding: 0 30px;
         overflow-y: scroll;

         &::-webkit-scrollbar {
            width: 5px;
         }

         &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset #fff;
            border-radius: 4px;
         }

         &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
         }
      }
      .theme-modal .modal-content .close-btn {
         position: absolute;
         top: 15px;
         right: 15px;
         margin: 0;
         color: var(--text-primary);
         cursor: pointer;
         i {
            font-size: 24px;
         }
      }
      h3.main-title {
         font-size: 24px;
         padding: 20px 30px;
         margin: 0;
         color: var(--text-primary);
         font-weight: 600;
      }
      h3.title {
         font-size: 18px;
         color: var(--text-primary);
         margin-bottom: 10px;
      }
      .title {
         font-weight: 700;
         text-transform: capitalize;
         display: block;
      }
      .columns {
         display: -moz-flex;
         display: flex;
         -webkit-box-lines: multiple;
         -moz-box-lines: multiple;
         box-lines: multiple;
         flex-wrap: wrap;
         position: relative;
         margin: 0 -15px;
      }
      .theme-modal .columns {
         margin: 0 -7px;
      }
      .theme-modal .column {
         padding-left: 7px;
         padding-right: 7px;
      }
      .theme-modal .modal-content .zm-card-theme {
         line-height: 0;
      }
      .zm-card {
         max-width: 100%;
         position: relative;
      }
      .theme-modal .modal-content .zm-card-theme .zm-card-image {
         border: 1px solid transparent;
      }
      .zm-card-image {
         display: block;
         position: relative;
         overflow: hidden;
         border-radius: 4px;
         flex-shrink: 0;
      }
      .zm-card-image.theme-image figure {
         height: 0;
         padding-bottom: 66.67%;
      }
      .zm-card-image figure {
         line-height: 0;
         height: 0;
         padding-bottom: 100%;
         border-radius: 5px;
         overflow: hidden;
      }
      figure {
         background-color: var(--loading-bg);
      }
      .theme-modal .modal-content .zm-card-theme .ic-check {
         /* display: none; */
         display: block;
         position: absolute;
         right: 8px;
         bottom: 8px;
         font-size: 12px;
         padding: 4px;
         border-radius: 50%;
         background-color: var(--purple-primary);
         color: var(--white);
         margin-right: 0;
         width: unset;
         height: unset;
      }
      .opacity {
         width: 100%;
         height: 100%;
         position: absolute;
         top: 0;
         left: 0;
         background-color: var(--dark-alpha-50);
         visibility: hidden;
      }
      .zm-actions {
         position: absolute;
         left: 50%;
         top: 50%;
         bottom: auto;
         right: auto;
         z-index: 98;
         transform: translateX(-50%) translateY(-50%);
         visibility: hidden;
         width: 80%;
      }
      .zm-card-image img {
         transition: transform 0.7s;
      }
      img {
         height: auto;
         width: 100%;
      }
      .zm-card-image.active .opacity,
      .zm-card-image.active .zm-actions,
      .zm-card-image:hover .opacity,
      .zm-card-image:hover .zm-actions {
         visibility: visible;
      }
      .theme-modal .modal-content .zm-card-theme .zm-btn {
         width: 100%;
         font-size: 8px;
      }
      .mar-b-10 {
         margin-bottom: 10px !important;
      }
      .theme-modal .modal-content .zm-card-theme .zm-btn {
         width: 100%;
         font-size: 8px;
      }
      .theme-actions .zm-btn.is-outlined {
         color: var(--white);
         font-weight: 500;
         padding: 5px 0;
      }
      .zm-btn.is-outlined.active {
         background-color: var(--purple-primary);
         border-color: var(--purple-primary);
         color: var(--white);
      }
      .zm-btn.is-small {
         font-size: 12px;
         padding: 6px 19px;
      }
      .zm-btn.is-outlined {
         display: flex;
         justify-content: center;
         align-items: center;
         font-weight: 400;
         background-color: var(--alpha-bg);
         border: 1px solid var(--border-primary);
         color: var(--text-primary);
         margin: 0 auto;
      }
      .is-upper {
         text-transform: uppercase;
      }
      .theme-actions .zm-btn.is-outlined:not(.active) {
         background-color: rgba(0, 0, 0, 0.3);
         border-color: hsla(0, 0%, 100%, 0.5);
      }
      .theme-modal .modal-content .zm-card-theme .zm-btn {
         width: 100%;
         font-size: 8px;
      }
      .theme-actions .zm-btn.is-outlined {
         color: var(--white);
         font-weight: 500;
         padding: 5px 0;
      }
      .zm-btn.is-small {
         font-size: 12px;
         padding: 6px 19px;
      }
      .zm-btn.is-outlined {
         display: flex;
         justify-content: center;
         align-items: center;
         font-weight: 400;
         background-color: var(--alpha-bg);
         border: 1px solid var(--border-primary);
         color: var(--text-primary);
         margin: 0 auto;
    }
    .zm-card-theme .zm-card-content {
        padding: 5px 0;
    }
    .theme-modal .modal-content .zm-card-theme .zm-card-content .title {
        font-size: 12px;
    }
    .zm-card-content .title {
         font-size: 14px;
         font-weight: 500;
         line-height: 1.36;
         color: var(--text-primary);
         overflow: hidden;
         text-overflow: ellipsis;
    }
`;
// src\components\RadioPage
export const ItemStyles = styled.div`
   margin-right: 12px;
   margin-left: 12px;
   padding: 16px;
   border-radius: 12px;
   position: relative;
   overflow: hidden;
   align-items: center;
   display: flex;
   text-align: left;
   align-items: center;
   display: flex;
   text-align: left;
   .cover {
      z-index: -1;
      -webkit-filter: blur(50px);
      filter: blur(50px);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
   }
   .opac {
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
   }
   .media-content {
      position: relative;
      color: var(--white);
      flex-basis: auto;
      flex-grow: 1;
      flex-shrink: 1;
      text-align: left;
      align-self: center;
      width: 0;
   }
   .host {
      font-size: 12px;
      font-weight: 500;
      color: rgba(254, 255, 255, 0.8);
      margin-bottom: 2px;
   }
   .image {
      height: 120px;
      width: 120px;
      border-radius: 6px;
      overflow: hidden;
   }
   .media-left {
      margin-right: 20px;
      position: relative;
   }
   .subtitle {
      margin-top: 4px;
      font-size: 14px;
      color: rgba(254, 255, 255, 0.8);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      white-space: normal;
      overflow: hidden;
   }
   .title {
      color: var(--white);
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
      line-height: normal;
      display: inline-block;
   }
`
// C:\Users\Administrator\Documents\GitHub\BlackCat-React\src\components\SearchPage
export const OutstandingItemsStyles = styled.div`
   &.is-item-search {
      .media {
         &:hover {
            .recently_list-item_hover {
               transition: 0.2s !important;
               display: flex !important;
            }
         }
         border-radius: none !important;
         background-color: transparent !important;
         padding: 8px !important;
         border-radius: 2px !important;
         transition: unset !important;
         cursor: pointer;
         .icon {
            font-size: 22px;
            width: 22px;
            height: 22px;
         }
      }
   }

   &.media-hover {
      &:hover .media {
         background-color: var(--box-hot-item-bg-hover) !important;
      }
   }
   .media {
      transition: all 0.2s linear;
      background-color: var(--box-hot-item-bg);
      align-items: center;
      display: flex;
      text-align: left;
      padding: 10px;
      border-radius: 5px;
   }

   .media-left,
   .media-right {
      margin-right: 10px;
   }
   .type {
      font-size: 12px;
      font-weight: 400;
      color: var(--text-secondary);
      margin-bottom: 3px;
      white-space: nowrap;
   }

   .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: var(--text-primary);
      margin-bottom: 0;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      height: auto;
      overflow: hidden;
   }
   .subtitle {
      margin-top: 2px;
      font-weight: 400;
      font-size: 12px;
      color: var(--text-secondary);
   }

   i {
      margin-right: 0;
   }
   .title-hover:hover {
      text-decoration: underline;
   }
`;
// C:\Users\Administrator\Documents\GitHub\BlackCat-React\src\components\Selection
export const StyleDiv = styled.div`
   &.active {
      .recently_list-item_hover {
         transition: 0.2s !important;
         display: flex !important;
      }
      .recently_btn-hover-play .icon {
         width: 34px;
         height: 34px;
      }
   }

   @media (max-width: 719px) {
      &.active {
         .player_btn {
            display: none !important;
         }
      }
   }

   .player_btn.like {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 999px;
      line-height: normal;
      border: 0;
      display: inline-block;
      font-weight: 400;
      text-align: center;
      cursor: pointer;
      margin: 0 2px;
      border: none;
      color: var(--player-text);
      padding: 6px;
      i {
         font-size: 16px;
         padding: 5px;
         border-radius: 50%;
         margin-right: 0;
         display: flex;
         justify-content: center;
         align-items: center;
      }
   }
`;
// C:\Users\Administrator\Documents\GitHub\BlackCat-React\src\components\VideoMv
export const VideoPlayItemsStyles = styled.div`
   .title {
      font-weight: 700;
      line-height: 1.3;
      white-space: normal;
   }
   .video-player-item:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
   }
`;
// C:\Users\Administrator\Documents\GitHub\BlackCat-React\src\components\ViewPlayMusicFull
export const LyricStyleds = styled.li`
animation: opactiy 0.5s linear forwards;

&.up {
   animation: out 0.5s linear forwards !important;
}

& > span {
   display: inline-block;
   text-align: center;
   margin: 20px 0;
   letter-spacing: 1.2px;
   font-weight: 700;
   line-height: 1.2;
   position: relative;
   white-space: nowrap;
   overflow: hidden;
   .kara-text-highlight {
      width: 0;
      position: absolute;
      top: 0;
      left: 0;
      color: #ffed00;
      overflow: hidden;
   }
}

@keyframes opactiy {
   from {
      opacity: 0.2;
   }
   to {
      opacity: 1;
   }
}
@keyframes out {
   from {
      opacity: 1;
   }
   to {
      opacity: 0.2;
   }
}
`;

export const LyricStyled = styled.li`
& > span {
   display: inline-block;
   text-align: center;
   margin: 20px 0;
   letter-spacing: 1.2px;
   font-weight: 700;
   line-height: 1.2;
   position: relative;
   white-space: nowrap;
   overflow: hidden;
   .kara-text-highlight {
      width: 0;
      position: absolute;
      top: 0;
      left: 0;
      color: #ffed00;
      overflow: hidden;
   }
}
`;
// 
export const CommentStyle = styled.div`
   .feed-detail {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #000;
      img {
         position: relative;
         object-fit: cover;
         width: auto;
      }
   }
   .theme-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1080;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--dark-alpha-50);
   }

   .alert-enter {
      opacity: 0;
      transform: scale(0.9);
   }
   .alert-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 300ms, transform 300ms;
   }
   .alert-exit {
      opacity: 1;
   }
   .alert-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 300ms, transform 300ms;
   }

   .zm-portal-modal .modal {
      background-color: var(--primary-bg);
      border-radius: 8px;

      max-width: 900px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      z-index: 40;
   }
   .theme-modal .modal-content {
      width: 70vw;
      max-width: 900px;
   }

   .theme-modal .modal-content .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      margin: 0;
      color: var(--text-primary);
      cursor: pointer;
      i {
         font-size: 24px;
      }
   }

   .subtitle {
      font-size: 12px;
      font-weight: 300;
      margin-top: 3px;
      white-space: nowrap;
      color: var(--text-secondary);
      &:hover {
         color: var(--link-text-hover);
      }
   }

   .recently_list-item_hover {
      background-color: rgba(0, 0, 0, 0.2);
   }
   .name {
      &:hover {
         color: var(--link-text-hover);
      }
   }

   .btn-care {
      color: var(--link-text-hover);
      &:hover {
         filter: brightness(0.9);
      }

      &.is-care {
         color: var(--text-placeholder);
      }
   }
   .title {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 20;
      height: auto;
      overflow: hidden;
   }

   .title-desp {
      border-top: 1px solid var(--border-secondary);
      border-bottom: 1px solid var(--border-secondary);
   }
   .feed-footer {
      border-bottom: 1px solid var(--border-secondary);
   }
   .recently_list-item_hover {
      display: flex !important;
   }
   .main_page-hover:hover img {
      transform: scale(1) !important;
   }
   .list-comment {
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 10px;
      flex-shrink: 0;
   }

   .zm-btn.close-feed-modal {
      position: fixed;
      color: var(--white);
      margin: 0;
      top: 14px;
      right: 14px;
      width: 40px;
      height: 40px;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: hsla(0, 0%, 100%, 0.3);
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 30%);
      .icon.ic-svg-close-white {
         background-image: url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.7.23/static/media/close-white.42640965.svg);
      }
   }

   .reactions {
      margin-left: 4px;
      margin-top: 6px;
      display: flex;
      align-items: center;
      gap: 10px;
      .item {
         display: flex;
         justify-content: center;
         align-items: center;

         .icon {
            cursor: pointer;
            width: 18px;
            height: 18px;
         }

         i {
            line-height: 0;
            font-size: 18px;
            margin-right: 4px;
         }
      }
   }
`;
// 
export const ItemAritsStyles = styled.div`
.main-page_list-item_img {
   img {
      border-radius: 999rem;
      border: 2px solid #333;
   }
}

.is-mvpage.zm-btn {
   height: 38px;
   width: 38px;
   background: #fff;
   color: #000;
   position: absolute;
   top: 85.3%;
   left: 85.3%;
   transform: translate(-60%, -60%);
   box-shadow: 0 1.22656px 4.90625px rgb(0 0 0 / 16%);
   font-size: 16px;
   display: flex;
   align-items: center;
   justify-content: center;
   &:hover {
      -webkit-filter: brightness(0.9);
      filter: brightness(0.9);
   }
}
.title {
   font-size: 14px;
   font-weight: 500;
   line-height: 1.36;
   color: var(--text-primary);
   overflow: hidden;
   text-overflow: ellipsis;
   text-transform: capitalize;
   display: block;
   &:hover {
      text-decoration: underline;
   }
}

.subtitle {
   font-size: 12px;
   font-weight: 400;
   line-height: 1.33;
   color: var(--text-secondary);
}
.item-mvArits-footer {
   .play-btn {
      background-color: transparent;
      font-size: 12px;
      padding: 4px 14px;
   }
}
.mvpage-link-arlit {
   border: 1px solid var(--border-primary);
   border-radius: 50%;
   position: relative;
   i {
      width: 40px;
      height: 40px;
      margin-right: 0;
      position: absolute;
      top: 52%;
      left: 50%;
      font-size: 40px;
      transform: translate(-50%, -50%);
   }
}

.item-myArits-last:hover {
   i,
   a {
      color: var(--link-text-hover);
   }
}
.play-btn:hover {
   border-color: var(--link-text-hover);
   color: var(--link-text-hover);
   transition: 0.1s;
}
`;

export const UpdateProfileStyled = styled.div`
   max-width: 500px;
   margin-left: auto;
   margin-right: auto;
   .form-control {
      background-color: #fff;
      width: 100%;
      color: #333333;
      font-size: 18px;
      height: 50px;
      margin-top: 6px;
      padding: 12px 22px;
      border-radius: 4px;
      border: solid 1px #bcc2ce;
      outline: none;
      -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 10%), 0 0 2px 0 rgba(0, 0, 0, 10%);
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 10%), 0 0 2px 0 rgba(0, 0, 0, 10%);
   }
   .btn-login {
      color: white;
      width: 100%;
      padding: 12px;
      margin-top: 2rem;
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      background-color: #486ff2;
      border-color: #486ff2;
      box-shadow: 0px 2px 3px #9c9c9c;

      &:hover {
         opacity: 0.8;
         cursor: pointer;
      }
   }
   label {
      font-size: 16px;
      font-weight: 500;
   }
`;
// 
export const LoginPortalStyyles = styled.div`
     background-color: var(--primary-bg);
     border-radius: 8px;
     box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
     width: 240px;
     z-index: 101;
     padding-top: 10px;
     padding-bottom: 10px;
     .menu-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        li.is-active, li:hover {
           background-color: var(--alpha-bg);
           color: var(--text-item-hover);
        }
        li {
           width: 100%;
        }
        li button {
           font-size: 14px;
           color: var(--navigation-text);
           display: flex;
           justify-content: start;
           align-items: center;
           padding: 12px 20px;
           i {
              margin-right: 10px;
              font-size: 20px;
           }
        }
        li a {
           color: var(--text-secondary);
        }
     }
     .tippy-box {
        background-color: transparent;
        border: none;
        .tippy-content {
           padding: 0;
        }
     }
`;
// 
export const SuggestListStyles = styled.ul`
position: absolute;
overflow: hidden;
width: 100.32% !important;
height: auto;
min-height: 0;
background-color: var(--primary-bg);
z-index: 5;
display: block;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
box-shadow: 0 4px 6px 0 rgb(32 33 36 / 28%);
padding: 13px 10px;
color: var(--text-primary);
top: 100%;
left: -0.6px;
.suggest__list--content {
   max-height: calc(100vh - 180px);
   overflow-y: auto;
}

div {
   word-break: break-word;
}

.search__title {
   font-size: 14px;
   font-weight: 700;
   padding: 0 10px 8px;
   display: flex;
   justify-content: space-between;
}
.suggest__item {
   display: flex;
   align-items: baseline;
   border-radius: 4px;
   padding: 8px 10px;
   position: relative;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   cursor: pointer;
   .icon {
      font-size: 16px;
      color: var(--text-secondary);
      position: relative;
      top: 3px;
      margin-right: 10px;
   }
   &:hover {
      background-color: var(--alpha-bg);
   }
}
.is-oneline {
   overflow: hidden;
   text-overflow: ellipsis;
}
`;
// 
export const PortalStyles = styled.div`
      .message-wrapper {
         width: 100%;
         padding-left: 15px;
         padding-right: 15px;
         padding-bottom: 15px;
         background: var(--primary-bg);
         .noti-message {
            background-color: var(--alpha-bg);
            color: var(--text-second);
            font-weight: 500;
            padding: 10px 15px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
         }
      }

      .feed-detail {
         display: flex;
         justify-content: center;
         align-items: center;
         width: 100%;
         height: 100%;
         background-color: #000;
         img {
            position: relative;
            object-fit: cover;
            width: auto;
         }
      }
      .theme-modal-overlay {
         position: fixed;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         z-index: 1080;
         display: flex;
         justify-content: center;
         align-items: center;
         background-color: var(--dark-alpha-50);
      }

      .alert-enter {
         opacity: 0;
         transform: scale(0.9);
      }
      .alert-enter-active {
         opacity: 1;
         transform: translateX(0);
         transition: opacity 300ms, transform 300ms;
      }
      .alert-exit {
         opacity: 1;
      }
      .alert-exit-active {
         opacity: 0;
         transform: scale(0.9);
         transition: opacity 300ms, transform 300ms;
      }

      .zm-portal-modal .modal {
         background-color: var(--primary-bg);
         border-radius: 8px;
         max-width: 900px;
         display: flex;
         align-items: center;
         flex-direction: column;
         justify-content: center;
         position: fixed;
         z-index: 40;
      }
      .theme-modal .modal-content {
         width: 80vw;
         max-width: 900px;
      }

      .theme-modal .modal-content .close-btn {
         position: absolute;
         top: 15px;
         right: 15px;
         margin: 0;
         color: var(--text-primary);
         cursor: pointer;
         i {
            font-size: 24px;
         }
      }

      .subtitle {
         font-size: 12px;
         font-weight: 300;
         margin-top: 3px;
         white-space: nowrap;
         color: var(--text-secondary);
         &:hover {
            color: var(--link-text-hover);
         }
      }

      .recently_list-item_hover {
         background-color: rgba(0, 0, 0, 0.2);
      }
      .name {
         &:hover {
            color: var(--link-text-hover);
         }
      }

      .btn-care {
         color: var(--link-text-hover);
         &:hover {
            filter: brightness(0.9);
         }

         &.is-care {
            color: var(--text-placeholder);
         }
      }
      .title {
         display: -webkit-box;
         text-overflow: ellipsis;
         -webkit-box-orient: vertical;
         -webkit-line-clamp: 20;
         height: auto;
         overflow: hidden;
      }

      .title-desp {
         border-top: 1px solid var(--border-secondary);
         border-bottom: 1px solid var(--border-secondary);
      }
      .feed-footer {
         border-bottom: 1px solid var(--border-secondary);
      }
      .recently_list-item_hover {
         display: flex !important;
      }
      .main_page-hover:hover img {
         transform: scale(1) !important;
      }
      .list-comment {
         font-size: 13px;
         font-weight: 700;
         margin-bottom: 10px;
         flex-shrink: 0;
      }

      .zm-btn.close-feed-modal {
         position: fixed;
         color: var(--white);
         margin: 0;
         top: 14px;
         right: 14px;
         width: 40px;
         height: 40px;
         font-size: 24px;
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 50%;
         background-color: hsla(0, 0%, 100%, 0.3);
         box-shadow: 0 2px 4px 0 rgb(0 0 0 / 30%);
         .icon.ic-svg-close-white {
            background-image: url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.7.23/static/media/close-white.42640965.svg);
         }
      }

      @media (max-width: 1113px) {
         .feed-detail {
            overflow: hidden;
            height: 85% !important;
         }
         .row {
            flex-wrap: wrap !important ;
         }
      }
`;
// SliderHome
export const EventStyle = styled.div`
      .favorite_content-name {
        white-space: nowrap;
        font-size: 18px !important;
        font-weight: 700 !important;
        margin-top: 4px !important;
        margin-bottom: 2px !important;
      }
      .favorite_content-list {
        font-size: 14px;
        font-weight: 500;
        color: var(--white);
        white-space: nowrap;
      }
      .tag {
        display: inline-block;
        font-size: 12px;
        padding: 2px 4px;
        border-radius: 2px;
        color: #ff0101;
        background-color: #fff;
        text-transform: uppercase;
      }
      .avatars-item {
        width: 15px;
        line-height: 0;
      }
      .avatars-item-img {
        border-radius: 999px;
        overflow: hidden;
        height: 20px;
        width: 20px;
        border: 2px solid var(--primary-bg);
      }
      .right-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        padding: 9px 20px;
        background-color: var(--purple-primary);
        border-color: var(--purple-primary);
        color: var(--white);
        font-size: 14px;
        text-transform: uppercase;
        border: 1px solid var(--border-primary);
        transition: width 0.2s linear;
        &.is-active {
           background-color: transparent;
           border-color: var(--border-primary);
           color: var(--text-primary);
        }
      }
      .avatars {
        display: flex;
        justify-content: flex-start;
      }
      .left-title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
        color: var(--text-primary);
      }
      .text-item {
        font-size: 14px;
        margin-left: 8px;
        color: var(--text-secondary);
      }
`;

export const NewReleaseStyle = styled.div`
.m-6 {
   margin: unset;
}
.genre-select {
   color: var(--white);
   .zm-btn.active {
      border-color: var(--purple-primary);
      background-color: var(--purple-primary);
      color: var(--white);
   }
   .zm-btn {
      padding: 4px 24px;
      border: 1px solid var(--border-primary);
      border-radius: 100px;
      font-weight: 400;
      font-size: 12px;
      text-transform: uppercase;
      margin-right: 15px;
   }
}
`;

export const SlideStyle = styled.div`
flex-grow: 1;
margin: 0 auto;
position: relative;
width: 100%;
.gallery-container {
   align-items: center;
   justify-content: center;
   display: flex;
   position: relative;
   transform-style: preserve-3d;
}
.gallery-item {
   height: auto;
   transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out, z-index 0s linear 0.25s;
   width: 100%;
   z-index: 1;
   opacity: 1;
   border-radius: 8px;
   padding: 15px;
}
.gallery-item.gallery-item-selected {
   transform: translateX(0);
   opacity: 1;
   z-index: 10;
}
.gallery-item.gallery-item-next {
   transform: translateX(100%);
}
.gallery-item.gallery-item-next, .gallery-item.gallery-item-previous {
   opacity: 1;
   z-index: 1;
}
.gallery-item.gallery-item-last {
   transform: translateX(20%);
}
.gallery-item.gallery-item-last {
   transform: translateX(20%);
}
.gallery-item.gallery-item-previous {
   transform: translateX(-100%);
}
.gallery-item .zm-card-image {
   border-radius: 8px;
}
.zm-card-image {
   display: block;
   position: relative;
   overflow: hidden;
   border-radius: 4px;
   flex-shrink: 0;
}
`;
// 
export const InfoTopStyles = styled.div`
   .read-more {
      display: inline-block;
      color: var(--text-item-hover);
      font-size: 12px;
      font-weight: 700;
      line-height: 1.92;
      cursor: pointer;
      text-transform: uppercase;
   }
`;

export const PortalStyless = styled.div`
   .theme-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1080;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   .zm-portal-modal .modal {
      background-color: var(--primary-bg);
      border-radius: 8px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      z-index: 40;
   }

   .top {
      position: relative;
      overflow: hidden;
      border-radius: 8px 8px 0 0;
      .cover-bg {
         background-repeat: no-repeat;
         background-position: 50%;
         background-size: cover;
         background-position-y: 10%;
         -webkit-filter: blur(50px);
         filter: blur(50px);
         position: absolute;
         top: 0;
         bottom: 0;
         left: 0;
         right: 0;
      }
      .blur-bg {
         opacity: 0.4;
         background-color: var(--primary-bg);
         position: absolute;
         top: 0;
         bottom: 0;
         left: 0;
         background-size: cover;
         right: 0;
      }
      .top-content {
         display: flex;
         flex-direction: column;
         align-items: center;
         padding-top: 24px;
         position: relative;
         background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0), var(--primary-bg));
      }
      .image {
         width: 110px;
         height: 110px;
         border-radius: 50%;
         overflow: hidden;
         margin-bottom: 12px;
      }
      .title {
         font-size: 24px;
         font-weight: 700;
         margin-bottom: 0;
      }
   }
   .bio-content {
      padding: 24px;
      & > div {
         line-height: 1.43;
         color: var(--text-secondary);
         max-height: 218px;
         padding-bottom: 2rem;
      }
   }
   .close-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 2;
   }
`;
// bottom

export const EmptyStyled = styled.div`
display: flex;
flex-direction: column;
align-items: center;

.icon.favorite-song,
.icon.new-song {
   background-image: var(--empty-song-icon);
}
.icon {
   height: 120px;
   background-size: cover;
   width: 120px;
}

.text {
   font-size: 16px;
   margin-top: 16px;
   color: var(--text-secondary);
   font-weight: 500;
}

.zm-btn.is-outlined.active {
   background-color: var(--purple-primary);
   border-color: var(--purple-primary);
   color: var(--white);
}
.zm-btn.is-medium {
   margin-top: 16px;
   font-size: 14px;
   padding: 9px 24px;
}
`;

/// clock

export const _PortalStyle = styled.div`
.confirm-modal {
   width: 500px;
   padding: 2rem;
   .title {
      margin-bottom: 10px;
   }
   .zm-btn {
      padding: 6px 15px;
      margin: 0;
   }
}

.zm-btn[disabled] {
   box-shadow: none;
   opacity: 0.5;
   cursor: not-allowed;
}

.theme-modal-overlay {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 1080;
   display: flex;
   justify-content: center;
   align-items: center;
}

.zm-portal-modal .modal {
   background-color: var(--primary-bg);
   border-radius: 8px;
   display: flex;
   align-items: center;
   flex-direction: column;
   justify-content: center;
   position: fixed;
   z-index: 40;
}
.alarm-setting {
   width: 330px;
   margin: 0;
   padding: 30px 25px 15px;
   position: relative;
   text-align: center;
}

.title {
   margin-bottom: 25px;
   font-size: 18px;
   color: var(--text-primary);
   font-weight: 700;
   text-transform: capitalize;
   display: block;
}
.time-picker {
   display: flex;
   justify-content: space-around;
   padding: 15px 19px 20px 20px;
   border-radius: 8px;
   background-color: var(--alpha-bg);
   .time-input {
      display: flex;
      align-items: center;
      border-bottom: 2px solid #ccc;
      width: 100px;
      justify-content: center;
      position: relative;
      cursor: default;
   }
   .label {
      text-transform: uppercase;
      color: var(--text-secondary);
   }

   .dot {
      font-size: 34px;
   }

   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }

   /* Firefox */
   input[type="number"] {
      -moz-appearance: textfield;
   }

   input {
      background-color: transparent;
      outline: none;
      border: none;
      font-size: 34px;
      padding: 0;
      height: 40px;
      width: 50px;
      letter-spacing: 3px;
   }

   .control {
      font-size: 1rem;
      position: relative;
   }

   .control {
      box-sizing: border-box;
      clear: both;
      text-align: inherit;
   }
}
.estimate-time {
   font-size: 12px;
   margin: 20px 0;
   color: var(--text-secondary);
}
`;

export const _LoginPortalStyyles = styled.div`
   background-color: var(--primary-bg);
   border-radius: 8px;
   box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
   width: 240px;
   z-index: 101;
   padding-top: 10px;
   padding-bottom: 10px;
   .menu-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      li.is-active,
      li:hover {
         background-color: var(--alpha-bg);
         color: var(--text-item-hover);
      }
      li {
         width: 100%;
      }

      li button {
         font-size: 14px;
         color: var(--navigation-text);
         display: flex;
         justify-content: start;
         align-items: center;
         padding: 12px 20px;
         i {
            margin-right: 10px;
            font-size: 20px;
         }
      }
      li a {
         color: var(--text-secondary);
      }
   }

   .tippy-box {
      background-color: transparent;
      border: none;

      .tippy-content {
         padding: 0;
      }
   }
`;

// follow
export const _ItemStyles = styled.div`
   border-radius: 8px;
   padding: 20px;
   box-shadow: 0 2px 10px 0 var(--main-box-shadow);
   background-color: var(--box-item-bg);
   position: relative;
   .subtitle {
      font-size: 12px;
      font-weight: 300;
      margin-top: 3px;
      white-space: nowrap;
      color: var(--text-secondary);
      &:hover {
         color: var(--link-text-hover);
      }
   }

   .recently_list-item_hover {
      background-color: rgba(0, 0, 0, 0.2);
   }
   .name {
      &:hover {
         color: var(--link-text-hover);
      }
   }

   .btn-care {
      color: var(--link-text-hover);
      &:hover {
         filter: brightness(0.9);
      }

      &.is-care {
         color: var(--text-placeholder);
      }
   }
   .title {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      height: auto;
      overflow: hidden;
   }
   .recently_list-item_hover {
      display: flex !important;
   }
   .main_page-hover:hover img {
      transform: scale(1) !important;
   }
`;
// hub 
export const HubDetailPageStyles = styled.div`
   .cover {
      position: relative;
      margin: 0 calc(var(--padding-section) * -1);
      text-align: center;
      padding-bottom: 30%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0;
      background-color: var(--loading-bg);
   }
   .blur {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      filter: unset;
      &:before {
         content: "";
         clear: both;
         position: absolute;
         width: 100%;
         height: 50%;
         bottom: 0;
         left: 0;
         background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0), var(--layout-bg));
      }
   }
`;
// pages 
export const AlbumPageStyles = styled.div`
      @media (max-width: 600px) {
         .playlist-header {
            flex-wrap: wrap;
            gap: 16px;
            .media-left,
            .media-content {
               width: 100%;
            }
            .media-content {
               margin-bottom: 10px;
            }
         }
      }
      .zing-chart_item.none-hover {
         &:hover {
            background-color: unset !important;
         }
      }
      .column-text {
         font-size: 12px !important;
         font-weight: 500;
         text-transform: uppercase;
         color: var(--text-secondary);
      }
      .bottom-info {
         font-size: 12px;
      }
      .subtitle {
         color: var(--text-secondary);
      }

      .clearfix:after {
         display: block;
         clear: both;
         content: "";
      }
      .zing-chart_list .main-page_list-item_img {
         width: 40px !important;
      }

      .description span {
         color: var(--text-secondary);
      }

      .media_right {
         display: flex;
         margin-top: 1rem;
         align-items: center;
         justify-content: center;
         gap: 10px;

         i {
            font-size: 16px;
            padding: 5px;
            border-radius: 50%;
            margin-right: 0;
         }

         div {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            border-radius: 999px;
            line-height: normal;
            border: 0;
            display: inline-block;
            font-weight: 400;
            text-align: center;
            cursor: pointer;
            margin: 0 2px;
            border: none;
            color: var(--player-text);
            padding: 6px;
         }
      }

      .playlist-header .media-content .content-top {
         width: 100%;
      }
      .playlist-header .media-content {
         display: flex;
         flex-direction: column;
         align-self: normal;
         justify-content: space-between;
         align-items: flex-start;
      }
      .media-content {
         flex-basis: auto;
         flex-grow: 1;
         flex-shrink: 1;
         text-align: left;
         align-self: center;
         width: 0;
      }

      .playlist-header .media-left {
         margin-right: 20px;
         flex-basis: auto;
         flex-grow: 0;
         flex-shrink: 0;
      }

      .playlist-header {
         padding: 0 0 30px;
      }
      .media {
         align-items: center;
         display: flex;
         text-align: left;
         padding: 10px;
         border-radius: 5px;
         -webkit-user-select: none;
         -ms-user-select: none;
         user-select: none;
      }
      .playlist-header .media-content .content-top .artists,
      .playlist-header .media-content .content-top .created-by,
      .playlist-header .media-content .content-top .like,
      .playlist-header .media-content .content-top .release {
         color: var(--text-secondary);
         font-size: 12px;
         line-height: 1.75;
      }

      .content-top .title {
         font-size: 20px;
         font-weight: 700;
         line-height: 1.5;
         margin-bottom: 0;
         text-transform: none;
      }

      .is-ghost:hover {
         text-decoration: underline;
      }

      @media screen and (min-width: 1200px) {
         .playlist-header.sticky {
            position: -webkit-sticky;
            position: sticky;
            top: 10px;
         }
         .playlist-header {
            display: block;
            width: 300px;
            float: left;
         }
         .playlist-header .media-left {
            margin-right: 0;
         }
         .playlist-header .media-content {
            display: flex;
            align-items: center;
            margin-top: 12px;
            width: 100%;
         }
         .content-top {
            text-align: center;
         }

         .playlist-detail-container .playlist-content {
            margin-left: 330px;
         }

         .media-content .actions {
            flex-direction: column;
            margin-top: 16px;
         }
         .content-top .title {
            white-space: normal;
         }
      }
`;

export const ArtistPageStyles = styled.div`
   .avatar {
      width: 260px;
      height: 260px;
      border-radius: 50%;
      overflow: hidden;
   }
   .content-detail {
      max-height: 70px;
      overflow-y: auto;
      font-size: 14px;
      line-height: 1.64;
      margin-bottom: 10px;
      span {
         display: inline-block;
         color: var(--text-item-hover);
         font-size: 12px;
         font-weight: 700;
         line-height: 1.92;
         cursor: pointer;
      }
   }
   .artist-name {
      color: var(--text-primary);
      font-size: 40px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.08px;
      margin-bottom: 5px;
   }
`;

export const SignUpStyles = styled.div({
   "position": "fixed",
   "top": 0,
   "left": 0,
   "right": 0,
   "bottom": 0,
   "width": "100vw",
   "height": "100vh",
   "background-color": "var(--layout-bg)",
   "z-index": 8888,
   "transition": "all 0.3s",
   "overflow-y": "auto",
   ".sider": {
      "margin-bottom": "2rem",
      ".sider_brand-item": {
         "font-size": "4rem",
         "display": "flex",
         "align-items": "center",
         "justify-content": "center",
         "font-family": "'Patrick Hand SC', cursive",
         "transition": "0.2s ease-in",
         "p": {
            "font-size": "4rem",
            "display": "flex",
            "-webkit-box-align": 'center',
            "align-items": "center",
            "font-family": "Patrick Hand SC, cursive",
            "transition": "0.2s ease-in",
         },
         "&:hover": {
            "opacity": "0.8",
            "cursor": "pointer",
         },
         "span": {
            "font-size": "3rem",
            "margin-left": "6px",
            "font-family": "'Patrick Hand SC', cursive",
         },
         ".sider_brand-item-img": {
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "img": {
               "max-height": "42px",
               "filter": "grayscale(100%)",
               "margin-right": "10px",
            }
         }
      }
   },
   ".authForm": {
      "position": "relative",
      "width": "100%",
      "margin-left": "auto",
      "margin-right": "auto",
      "align-items": "stretch",
      "-webkit-box-shadow": "0px 2px 6px 0px #1d2030",
      "box-shadow": "0px 2px 6px 0px #1d2030",
      ".left": {
         "background-color": "rgb(12 14 33 / 92%)",
         "color": "#ffffff",
         "border-top-left-radius": "4px",
         "border-bottom-left-radius": "4px",
         "padding-top": "30px",
         "padding-bottom": "40px",
         "padding-right": "30px",
         "padding-left": "30px",
      },
      ".right": {
         "padding-top": "30px",
         "padding-bottom": "40px",
         "padding-right": "30px",
         "padding-left": "30px",
         "background-color": "#ffffff",
         "border-top-right-radius": "4px",
         "border-bottom-right-radius": "4px",
         "color": "#2d385e",
         ".text-header": {
            "font-size": "20px",
            "font-weight": "500",
            "&.active": {
               "font-size": "30px",
               "font-weight": "700",
            }
         }
      },
      ".btnAuth": {
         "padding": "8px 8px",
         "width": "100%",
         "border": "1px solid transparent",
         "border-radius": "4px",
         "transition": "all 0.2s",
         "&:hover": {
            "opacity": "0.8",
         }
      }
   },
   ".form-control": {
      "background-color": "#fff",
      "width": "100%",
      "color": "#333333",
      "font-size": "18px",
      "height": "50px",
      "margin-top": "16px",
      "padding": "12px 22px",
      "border-radius": "4px",
      "border": "solid 1px #bcc2ce",
      "outline": "none",
      "-webkit-box-shadow": "0 3px 6px 0 rgba(0, 0, 0, 10%), 0 0 2px 0 rgba(0, 0, 0, 10%)",
      "box-shadow": "0 3px 6px 0 rgba(0, 0, 0, 10%), 0 0 2px 0 rgba(0, 0, 0, 10%)",
   },
   ".btn-login": {
      "color": "white",
      "width": "100%",
      "padding": "12px",
      "margin-top": "2rem",
      "font-size": "16px",
      "font-weight": "500",
      "border-radius": "4px",
      "background-color": "#486ff2",
      "border-color": "#486ff2",
      "box-shadow": "0px 2px 3px #9c9c9c",
      "&:hover": {
         "opacity": "0.8",
         "cursor": "pointer",
      }
   },
   "@media (max-width: 719px)": {
      ".left, .right": {
         "padding-top": "2rem !important",
         "padding-bottom": "2rem !important",
      },
      ".left": {
         "flex-direction": "column !important",
      },
      ".sider": {
         "margin-bottom": "1rem",
      }
   }
});