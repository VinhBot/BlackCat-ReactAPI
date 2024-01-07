import { useDispatch, useSelector } from "react-redux";
import usePortal from "react-cool-portal";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";

import { setClockOff, setPlay } from "../../../assets/redux/Features/settingPlayFeatures.js";
import { _PortalStyle as PortalStyle } from "../../../assets/styledComponents";

const ClockAlarm = React.memo(() => {
  const clockOff = useSelector((state) => state.setting.clockOff);
  const { Portal, show, hide } = usePortal({ defaultShow: false });
  const dispatch = useDispatch();
  
  const handleClickBackdrop = (e) => {
    if (e.target.id === "theme-overlay" || e.target.id === "portal-bio-arits" || e.target.id === "close-block" || e.target?.parentElement?.id === "close-block") {
      hide();
    };
  };
  let TimeOut;
  const formik = useFormik({
    initialValues: {
      hours: "00",
      minute: "00",
    },
    validationSchema: yup.object({
      hours: yup.number().required("Vui lòng nhập số giờ"),
      minute: yup.number().required("Vui lòng nhập số phút"),
    }),
    onSubmit: (values) => {
      clearTimeout(TimeOut);
      dispatch(setClockOff(true));
      TimeOut = setTimeout(() => {
        dispatch(setClockOff(false));
        dispatch(setPlay(false));
      }, parseInt(values.hours) * 60 * 60 * 1000 + parseInt(values.minute) * 60 * 1000);

      hide();

      toast(`Nhạc sẽ dừng sau ${values.hours} Giờ, ${values.minute} Phút`, {
        type: "success",
        autoClose: "default",
      });
    },
  });

  const watchHours = formik.values.hours === "0" || formik.values.hours === "00";
  const watchMinute = formik.values.minute === "0" || formik.values.minute === "00";

  const handleRemoveTimeOut = () => {
    clearTimeout(TimeOut);
    dispatch(setClockOff(false));
    hide();
  };

  return (
    <>
      <div onClick={() => show()} className={`player_btn queue_time ${clockOff ? "active" : ""}`}>
        <span className="material-icons-outlined">alarm</span>
        <div className="playing_title-hover">Hẹn giờ</div>
      </div>
      <Portal>
        <PortalStyle>
          <div className="zm-portal-modal theme-modal-overlay" id="theme-overlay" onClick={handleClickBackdrop}>
            {!clockOff && (
              <div className="modal is-active">
                <form onSubmit={formik.handleSubmit} name="ClockOut">
                  <div role="presentation" className="modal-background">
                    <div className="modal-content">
                      <div className="alarm-setting">
                        <h3 className="title">Hẹn giờ dừng phát nhạc</h3>
                        <div className="time-picker">
                          <div className="time-input">
                            <div className="control">
                              <input
                                onInput={(e) => {
                                  if (e.target.value.length >= 2) {
                                    e.target.value = e.target.value.slice(0, 2);
                                  }
                                }}
                                {...formik.getFieldProps("hours")}
                                className={`input is-primary ${formik.touched.hours && formik.errors.hours ? "is-danger" : ""}`}
                                type="number"
                              />
                            </div>
                            <span className="label">giờ</span>
                          </div>
                          <div className="dot">:</div>
                          <div className="time-input">
                            <div className="control">
                              <input
                                onInput={(e) => {
                                  if (e.target.value > 59) {
                                    e.target.value = 59;
                                  }

                                  if (e.target.value.length >= 2) {
                                    e.target.value = e.target.value.slice(0, 2);
                                  }
                                }}
                                {...formik.getFieldProps("minute")}
                                className={`input is-primary ${formik.touched.minute && formik.errors.minute ? "is-danger" : ""}`}
                                type="text"
                                pattern="\d*"
                                maxLength="2"
                                max={60}
                              />
                            </div>
                            <span className="label">phút</span>
                          </div>
                        </div>
                        <h3 className="estimate-time subtitle">Chọn thời gian để dừng phát nhạc</h3>
                        <button
                          disabled={formik.errors.hours || formik.errors.minute || (watchHours && watchMinute)}
                          className="w-full zm-btn active is-medium is-outlined is-fullwidth is-upper button"
                          tabIndex={-1}
                          type="submit"
                        >
                          Lưu lại
                        </button>
                        <button
                          onClick={handleClickBackdrop}
                          type="button"
                          className="w-full zm-btn mar-t-10 active is-fullwidth is-upper button hover:opacity-90"
                          tabIndex={0}
                          id="close-block"
                        >
                          <i className="icon" />
                          <span>Hủy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
            {clockOff && (
              <div className="modal is-active">
                <div role="presentation" className="modal-background">
                  <div className="confirm-modal">
                    <h3 className="title">Xóa hẹn giờ</h3>
                    <span>Bạn có chắc chắn muốn xóa hẹn giờ?</span>
                    <div className="actions flex items-end justify-end mt-[16px]">
                      <button
                        onClick={() => {
                          hide();
                        }}
                        className="zm-btn is-outlined is-small button"
                        tabIndex={0}
                      >
                        Không
                      </button>
                      <button
                        onClick={handleRemoveTimeOut}
                        className="!ml-[16px] zm-btn is-outlined active is-small button"
                        tabIndex={0}
                      >
                        Có
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </PortalStyle>
      </Portal>
    </>
  );
});

export default ClockAlarm;