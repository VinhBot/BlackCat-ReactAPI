/* eslint-disable no-unused-expressions */
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { memo } from "react";
import { setName } from "../../../assets/redux/Features/formSearchFeatures.js";
import OutstandingItems from "../../SearchPage/OutstandingItems";
import { LoadingSvg } from "../../loading/LoadingSvg";
import { SuggestListStyles } from "../../../assets/styledComponents";


const SuggestList = memo(({ setOpen, setValue, value, refinput }) => {
   const { entities, loading, entitiesNew } = useSelector((state) => state.formsearch);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   return (
      <SuggestListStyles className="suggest__list">
         <div className="suggest__list--content">
            {loading && (
               <div>
                  <li className="suggest__item ">
                     <div className="is-oneline w-full h-full text-center">
                        <LoadingSvg isLoadMore></LoadingSvg>
                     </div>
                  </li>
               </div>
            )}
            {entities && !refinput.current.value && entities.length > 0 && (
               <>
                  <div className="search__title ">Đề xuất cho bạn</div>
                  {entities?.map((e, index) => {
                     if (e.link)
                        return (
                           <div key={index}>
                              <a href={e.link} target={"_blank"} hrefLang="eng" className="suggest__item" rel="noreferrer">
                                 <i className="icon ic-trend" />
                                 <div className="is-oneline">{e.keyword}</div>
                              </a>
                           </div>
                        )
                     return (
                        <div key={index}>
                           <div
                              onClick={() => {
                                 dispatch(setName(e.keyword));
                                 setOpen(false);
                                 setValue(e.keyword);
                                 refinput.current.value = e.keyword;
                                 navigate(`/tim-kiem/tatca/${e.keyword}`);
                              }}
                              className="suggest__item"
                           >
                              <i className="icon ic-trend" />
                              <div className="is-oneline">{e.keyword}</div>
                           </div>
                        </div>
                     )
                  })}
               </>
            )}
            {entitiesNew && !loading && refinput.current.value && refinput.current.value.length > 0 && (
               <>
                  <div className="search__title">Từ khóa liên quan</div>
                  {entitiesNew[0].keywords?.map((e, index) => {
                     return (
                        <div key={index}>
                           <div
                              onClick={() => {
                                 dispatch(setName(e.keyword));
                                 setOpen(false);
                                 setValue(e.keyword);
                                 refinput.current.value = e.keyword;
                                 navigate(`/tim-kiem/tatca/${e.keyword}`);
                              }}
                              className="suggest__item"
                           >
                              <i className="icon ic-trend" />
                              <div className="is-oneline">{e.keyword}</div>
                           </div>
                        </div>
                     )
                  })}
               </>
            )}
            {entitiesNew && !loading && refinput.current.value && refinput.current.value.length > 0 && (
               <>
                  <div className="search__title  !pt-[10px] ">Gợi ý kết quả</div>
                  {entitiesNew[1]?.suggestions?.slice(0, 6).map((suggestion, index) => (
                     <OutstandingItems key={index} setOpen={setOpen} isSearch data={suggestion} />
                  ))}
               </>
            )}
         </div>
      </SuggestListStyles>
   )
})

export default SuggestList;