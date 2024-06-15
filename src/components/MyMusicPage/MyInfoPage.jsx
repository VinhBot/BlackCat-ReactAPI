import React, { memo, useEffect, useState, Fragment, useRef } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { database, auth } from "../../assets/firebase/firebase-config.js";
import { authAction } from "../../assets/redux/Features/authFeatures.js";
import { UpdateProfileStyled } from "../../assets/styledComponents.js";
import PlayListSelector from "../Selection/PlayListSelector.jsx";

const MyInfoPage = memo(() => {
    const userInfo = useSelector((state) => state.auth); // Sử dụng Redux hook để lấy thông tin người dùng từ trạng thái Redux
    const dispatch = useDispatch(); // Sử dụng Redux hook để gửi các action đến Redux store
    const inputRef = useRef(); // Sử dụng useRef để tạo tham chiếu đến input file
    // Khởi tạo các trạng thái cho trang đổi mật khẩu và xem trước hình ảnh
    const [previewImage, setPreviewImage] = useState(userInfo.profileImage); // Trạng thái xem trước hình ảnh
    const [changePasswordPage, setChangePasswordPage] = useState(false); // trạng thái đổi mật khẩu
    const [image, setImage] = useState(); // Trạng thái cho hình ảnh đã chọn
    // profileSetup
    const updateProfile = useFormik({
        initialValues: {
            profileImage: userInfo.profileImage, // ảnh đại diện
            displayName: userInfo.displayName, // tên người dùng
            username: userInfo.username, // Tên tài khoản đăng nhập
            email: userInfo.email || "", // email người dùng
        },
        onSubmit: async (formData, formikHand) => {
            try {
                formikHand.setSubmitting(true); // Mô phỏng việc gửi dữ liệu đến máy chủ (API) không đồng bộ.
                setTimeout(async () => formikHand.setSubmitting(false), 1000); // Mô phỏng đợi trong 1 giây và xử lý logic thực tế sau khi form được gửi, sau khi xử lý, đặt isSubmitting về false
            } catch (error) {
                // Xử lý lỗi trong quá trình gửi form
                console.error('Lỗi khi gửi form:', error);
                formikHand.setSubmitting(false);
            };
            // Tìm ra các giá trị thay đổi
            const changedValues = Object.keys(formData).reduce((acc, key) => {
                if (formData[key] !== userInfo[key]) acc[key] = formData[key];
                return acc;
            }, {});
            // Kiểm tra xem có giá trị thay đổi nào không
            if (Object.keys(changedValues).length > 0) {
                // Gửi yêu cầu PATCH chỉ với các giá trị đã thay đổi
                await updateDoc(doc(database, "blackcat-account", userInfo.uid), changedValues);
                dispatch(authAction.setUserInfo({
                    displayName: formData.displayName,
                    photoURL: formData.profileImage,
                    userName: userInfo.username,
                    email: formData.email,
                    uid: userInfo.uid,
                }));
            } else {
                // Không có giá trị thay đổi, trả về Promise đã được giải quyết ngay lập tức
                return Promise.resolve();
            };
            toast.success("Đã cập nhật thành công!");
        },
        // Chọn schema xác thực tùy thuộc vào trạng thái đăng ký
        validationSchema: Yup.object({
            displayName: Yup.string().required("Vui lòng nhập tên").max(30, "Tên không dài quá 30 kí tự").min(3, "Tên không ngắn quá 3 ký tự"),
            email: Yup.string().required("Vui lòng nhập email vào ô này").max(40, "Email dài quá 40 kí tự").email("Email bạn cung cấp không đúng định dạng"),
            profileImage: Yup.string("Chọn ảnh").nullable(),
        }),
    });
    // Chỉnh sửa lại mật khẩu.
    const setPassword = useFormik({
        initialValues: {
            password: "",
            passwordNew: "",
            passcordNewCheck: ""
        },
        onSubmit: async (formData, actions) => {
            try {
                formikHand.setSubmitting(true); // Mô phỏng việc gửi dữ liệu đến máy chủ (API) không đồng bộ.
                setTimeout(async () => formikHand.setSubmitting(false), 1000); // Mô phỏng đợi trong 1 giây và xử lý logic thực tế sau khi form được gửi, sau khi xử lý, đặt isSubmitting về false
                // Thực hiện lấy dữ liệu và điền nó vào mẫu.
                await getDoc(doc(database, "blackcat-account", userInfo.uid)).then((docSnap) => {
                    if (formData.password !== docSnap.data().password) {
                        toast.error("Mật Khẩu Không Chích Xác");
                        setTimeout(() => actions.resetForm({
                            values: {
                                password: "",
                            }
                        }), 1000);
                        return;
                    };

                    try {
                        updatePassword(auth.currentUser, formData.passwordNew);
                        toast.success("Cập Nhật Thành Công");
                        actions.resetForm({
                            values: {
                                password: "",
                                passwordNew: "",
                                passwordNewCheck: "",
                            },
                        });
                    } catch (error) {
                        toast("Cập Nhật Thất Bại", {
                            type: "error",
                        });
                    };
                });
            } catch (error) {
                // Xử lý lỗi trong quá trình gửi form
                console.error('Lỗi khi gửi form:', error);
                actions.setSubmitting(false);
            };
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Vui lòng nhập mật khẩu cũ vào ô này").max(30, "Mật khẩu không dài quá 30 kí tự").min(3, "Độ dài tối thiểu 3 ký tự"),
            passwordNew: Yup.string().required("Vui lòng nhập mật khẩu mới vào ô này").max(30, "Mật khẩu không dài quá 30 kí tự").min(3, "Độ dài tối thiểu 3 ký tự"),
            passwordNewCheck: Yup.string().required("Vui lòng nhập lại mật khẩu vào ô này").oneOf([Yup.ref("passwordNew"), null], "Nhập lại mật khẩu không khớp với mật khẩu đã cung cấp"),
        }),
    });
    // Hiệu ứng xử lý xem trước hình ảnh và cập nhật trường formik
    useEffect(() => {
        if (image) {
            const reader = new FileReader(); // Tạo đối tượng FileReader
            reader.onloadend = () => { // Xử lý khi kết thúc việc đọc file
                updateProfile.setFieldValue("profileImage", reader.result.toString()); // Cập nhật trường profileImage trong formik
                setPreviewImage(reader.result.toString()); // Cập nhật trạng thái xem trước hình ảnh
            };
            reader.readAsDataURL(image); // Đọc file dưới dạng Data URL
        } else {
            updateProfile.setFieldValue("profileImage", userInfo.profileImage); // Nếu không có hình ảnh được chọn, giữ nguyên ảnh đại diện hiện tại
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]); // useEffect sẽ chạy lại khi giá trị của image thay đổi
    const progress = 0;
    // Render form EditProfile
    return (
        <>
            <PlayListSelector
                isMyPage={
                    <button onClick={() => setChangePasswordPage((value) => !value)} className="font-medium text-[16px] flex justify-center items-center hover:opacity-70" type="button">
                        {changePasswordPage ? "Chỉnh Sửa Thông Tin" : "Đổi Mật Khẩu"}
                        <span className="material-icons-outlined"> chevron_right </span>
                    </button>
                }
                title={!changePasswordPage ? "Chỉnh Sửa Thông Tin" : "Đổi Mật Khẩu"}
            />
            <UpdateProfileStyled>
                {!changePasswordPage && (
                    <div>
                        <form onSubmit={updateProfile.handleSubmit} name="UpdateProfile" className="w-full">
                            <label htmlFor="">Ảnh Đại Diện</label>
                            <div className="text-center mb-10">
                                <label className="cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg w-[200px] h-[200px] !rounded-full min-h-0 mx-auto relative overflow-hidden group">
                                    <input type="file" ref={inputRef} className="hidden-input" accept="image/*" onChange={(event) => setImage(event.target.files[0].type.substring(0, 5) === "image" ? event.target.files[0] : null)} />
                                    {progress !== 0 && !previewImage && (
                                        <div className="absolute z-10 w-16 h-16 border-8 border-green-500 rounded-full loading border-t-transparent animate-spin"></div>
                                    )}
                                    {!previewImage && progress === 0 && (
                                        <div className="flex flex-col items-center text-center pointer-events-none">
                                            <img src="/img-upload.png" alt="upload-img" className="max-w-[80px] mb-5" />
                                            <p className="font-semibold">Thay đổi ảnh</p>
                                        </div>
                                    )}
                                    {previewImage && (
                                        <Fragment>
                                            <img src={previewImage} className="object-cover w-full h-full" alt="" />
                                            <button onClick={() => inputRef.current.click()} type="button" className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </Fragment>
                                    )}
                                    {!previewImage && (<div className="absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress" style={{ width: `${Math.ceil(progress)}%` }}></div>)}
                                </label>
                            </div>
                            {["displayName", "email"].map((field) => (
                                <div key={field} className="form-group mb-[16px]">
                                    <label htmlFor={field}>{field === "displayName" ? "Tên Hiển Thị" : "Email"}</label>
                                    <input
                                        type={field === "email" ? "email" : "text"}
                                        className={`form-control ${field}`}
                                        name={field}
                                        placeholder={field === "email" ? `${userInfo.email ? userInfo.email : "Không có email"}` : "Name"}
                                        value={updateProfile.values[field]}
                                        onChange={updateProfile.handleChange}
                                    />
                                    {updateProfile.errors[field] && updateProfile.touched[field] && (
                                        <div className="mt-[6px] px-[1rem] text-red-500">
                                            <p>{updateProfile.errors[field]}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button className="btn-login " type="submit" disabled={updateProfile.isSubmitting}>
                                {updateProfile.isSubmitting ? "Đang cập nhật ..." : "Cập nhật"}
                            </button>
                        </form>
                    </div>
                )}
                {changePasswordPage && (
                    <div>
                        <form onSubmit={setPassword.handleSubmit} name="UpdateProfile" className="w-full">
                            {["password", "passwordNew", "passwordNewCheck"].map((field, index) => (
                                <div key={index} className="form-group mt-[10px]">
                                    <label htmlFor={field}> {index === 0 ? "Mật khẩu cũ" : index === 1 ? "Mật khẩu Mới" : "Nhập lại mật khẩu mới"}</label>
                                    <input
                                        type="password"
                                        className="form-control password"
                                        name={field}
                                        placeholder={index === 0 ? "Mật khẩu cũ" : index === 1 ? "Mật khẩu Mới" : "Nhập lại mật khẩu mới"}
                                        value={setPassword.values[field]}
                                        onChange={setPassword.handleChange}
                                    />
                                    <span className="fa fa-eye-slash pwd-toggle" />
                                    {setPassword.errors[field] && setPassword.touched[field] && (
                                        <div className="mt-[6px] px-[1rem] text-red-500">
                                            <p>{setPassword.errors[field]}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button className="btn-login" type="submit" disabled={setPassword.isSubmitting}>
                                {setPassword.isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
                            </button>
                        </form>
                    </div>
                )}
            </UpdateProfileStyled>
        </>
    );
});

export default MyInfoPage;