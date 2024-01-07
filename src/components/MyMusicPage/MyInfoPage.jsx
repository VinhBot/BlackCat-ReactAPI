import React, { memo, useEffect, useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setUserInfo } from "../../assets/redux/Features/authFeatures.js";
import { UpdateProfileStyled } from "../../assets/styledComponents";
import PlayListSelector from "../Selection/PlayListSelector";
import { ApiHandler as AxiosAPI } from "../../assets/api.js";

const MyInfoPage = memo(() => {
    // Sử dụng Redux hook để lấy thông tin người dùng từ trạng thái Redux
    const userInfo = useSelector((state) => state.auth);
    // Sử dụng Redux hook để gửi các action đến Redux store
    const dispatch = useDispatch();
    // Sử dụng useRef để tạo tham chiếu đến input file
    const inputRef = useRef();
    // Khởi tạo các trạng thái cho trang đổi mật khẩu và xem trước hình ảnh
    const [changePasswordPage, setChangePasswordPage] = useState(false); // trạng thái đổi mật khẩu
    const [previewImage, setPreviewImage] = useState(userInfo.profileImage); // Trạng thái xem trước hình ảnh
    const [image, setImage] = useState(); // Trạng thái cho hình ảnh đã chọn
    // profileSetup
    const updateProfile = useFormik({
        initialValues: {
            profileImage: userInfo.profileImage,
            name: userInfo.name,
            email: userInfo.email || ""
        },
        onSubmit: async (formData, formikHand) => {
            try {
                // Mô phỏng việc gửi dữ liệu đến máy chủ (API) không đồng bộ
                formikHand.setSubmitting(true);
                // Mô phỏng đợi trong 1 giây
                setTimeout(async () => {
                    // Xử lý logic thực tế sau khi form được gửi
                    // Sau khi xử lý, đặt isSubmitting về false
                    formikHand.setSubmitting(false);
                }, 1000);
            } catch (error) {
                // Xử lý lỗi trong quá trình gửi form
                console.error('Lỗi khi gửi form:', error);
                formikHand.setSubmitting(false);
            };
            // Tìm ra các giá trị thay đổi
            const changedValues = {};
            for (const key in formData) {
                if (formData[key] !== userInfo[key]) {
                    changedValues[key] = formData[key];
                };
            };
            // Kiểm tra xem có giá trị thay đổi nào không
            if (Object.keys(changedValues).length > 0) {
                // Gửi yêu cầu PATCH chỉ với các giá trị đã thay đổi
                return AxiosAPI.updateProfile(userInfo.username, changedValues).then((updateData) => {
                    // Dispatch hành động Redux để cập nhật lại profile
                    dispatch(setUserInfo({
                        setUserName: userInfo.username,
                        setPhotoURL: formData.profileImage,
                        setEmail: formData.email,
                        setName: formData.name,
                    }));
                    toast.success(updateData.data.message);
                }).catch((error) => { // Ghi log nếu có lỗi xảy ra trong quá trình cập nhật
                    console.log(error);
                    toast.error("Lỗi cập nhật thông tin người dùng");
                });
            } else { // Không có giá trị thay đổi, trả về Promise đã được giải quyết ngay lập tức
                return Promise.resolve();
            };
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Vui lòng nhập tên").max(30, "Tên không dài quá 30 kí tự").min(3, "Tên không ngắn quá 3 ký tự"),
            email: Yup.string().required("Vui lòng nhập email vào ô này").max(40, "Email dài quá 40 kí tự").email("Email bạn cung cấp không đúng định dạng"),
            profileImage: Yup.string('Chọn ảnh').nullable(),
        }), // Chọn schema xác thực tùy thuộc vào trạng thái đăng ký
    });
    const setPassword = useFormik({
        initialValues: {
            password: "",
            passwordNew: "",
            passcordNewCheck: ""
        },
        onSubmit: async (formData, formikHand) => { 
            toast.warning("Tính năng đổi mật khẩu đang được phát triển xin vui lòng quay lại sau....")
            try {
                // Mô phỏng việc gửi dữ liệu đến máy chủ (API) không đồng bộ
                formikHand.setSubmitting(true);
                // Mô phỏng đợi trong 1 giây
                setTimeout(async () => {
                    // Xử lý logic thực tế sau khi form được gửi
                    // Sau khi xử lý, đặt isSubmitting về false
                    formikHand.setSubmitting(false);
                }, 1000);
            } catch (error) {
                // Xử lý lỗi trong quá trình gửi form
                console.error('Lỗi khi gửi form:', error);
                formikHand.setSubmitting(false);
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
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProfile.setFieldValue("profileImage", reader.result.toString());
                setPreviewImage(reader.result.toString());
            };
            reader.readAsDataURL(image);
        } else {
            updateProfile.setFieldValue("profileImage", userInfo.profileImage);
        };
    }, [image]);
    // Khai báo hàm xử lý sự kiện khi người dùng chọn xóa ảnh
    const handleDeleteImage = (event) => {
        // Lấy file từ sự kiện
        const file = event.target.files[0];
        // Kiểm tra xem file có tồn tại và là loại ảnh hay không
        // Nếu là ảnh, gán file cho biến hình ảnh (setImage), ngược lại gán giá trị null
        setImage(file && file.type.substr(0, 5) === "image" ? file : null);
    };
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
                                    <input type="file" ref={inputRef} className="hidden-input" accept="image/*" onChange={handleDeleteImage} />
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
                            {["name", "email"].map((field) => (
                                <div key={field} className="form-group mb-[16px]">
                                    <label htmlFor={field}>{field === "name" ? "Tên Hiển Thị" : "Email"}</label>
                                    <input
                                        type={field === "email" ? "email" : "name"}
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