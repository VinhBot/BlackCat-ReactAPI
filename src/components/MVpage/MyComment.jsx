import React, { memo } from "react";
import { CommentStyle } from "../../assets/styledComponents";

const MyComment = memo(() => {
   return (
      <CommentStyle>
         <div className="feed-header mb-[10px]">
            <div className="media flex items-start justify-start">
               <div className="media-left mr-[10px] ">
                  <figure className="image w-[25px] h-[25px] !rounded-full overflow-hidden">
                     <img src="https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-1-420x560.jpg" alt="" />
                  </figure>
               </div>
               <div className="flex flex-col">
                  <h3 className="mar-b-0 title leading-none mb-2">
                     <span className=" font-bold">Ahihi</span>
                     <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                     <span className="subtitle">3 ngày trước</span>
                  </h3>
                  <p style={{ fontSize: "1.125rem" }}>Liếc Mắt Kìa</p>
               </div>
            </div>
            <div className="reactions">
               <div className="item z-btn">
                  <i className="icon ic-like-other" />
                  <span>184</span>
               </div>
               <div className="item z-btn">
                  <i className="icon ic-dislike" />
                  <span>33</span>
               </div>
            </div>
            <div className="comment-reply-list-wrapper" />
         </div>
      </CommentStyle>
   )
})

export default MyComment
