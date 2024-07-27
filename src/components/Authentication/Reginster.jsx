import { createUserWithEmailAndPassword } from "firebase/auth";
import { object, string, ref as yupRef } from "yup";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import React from "react";
import { authAction } from "../../assets/redux/stores.js";
import { auth, database } from "../../assets/firebase-config.js";
import { getCurrentTime } from "../../assets/functions";

const Reginster = React.memo(({ dispatch, navigate }) => {
    // Sử dụng useFormik hook để quản lý biểu mẫu và xác thực
    const formik = useFormik({
        initialValues: {
            displayName: "",
            username: "",
            password: "",
            repeatPassword: "",
            profileImage: null,
        },
        // Chọn schema xác thực tùy thuộc vào trạng thái đăng ký
        validationSchema: object({
            // Kiểm tra và yêu cầu nhập tên
            displayName: string("Nhập tên").required("Tên là bắt buộc").min(1, "Tên quá ngắn!").max(40, "Tên quá dài!"),
            // Kiểm tra và yêu cầu nhập tên người dùng (username)
            username: string("Nhập tên tài khoản").required("Tên tài khoản là bắt buộc").min(3, "Quá ngắn!").max(40, "Quá dài!"),
            // Kiểm tra và yêu cầu nhập mật khẩu
            password: string("Nhập mật khẩu").required("Mật khẩu là bắt buộc").min(6, "Mật khẩu quá ngắn").max(50, "Mật khẩu quá dài")
                // Định nghĩa quy tắc mật khẩu
                /*.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
                message: "Vui lòng tạo một mật khẩu mạnh hơn"
                })*/,
            // Kiểm tra và yêu cầu nhập lại mật khẩu
            repeatPassword: string("Nhập lại mật khẩu").oneOf([yupRef("password")], "Mật khẩu phải trùng khớp").required("Mật khẩu là bắt buộc"),
            // Kiểm tra và chấp nhận ảnh đại diện (có thể để trống)
            // profileImage: string("Chọn ảnh").nullable(),
        }),
        // Hàm xử lý khi submit form
        onSubmit: async (formData, actions) => {
            try {
                actions.setSubmitting(true); // Mô phỏng việc gửi dữ liệu đến máy chủ (API) không đồng bộ
                setTimeout(() => actions.setSubmitting(false), 1000); // Mô phỏng đợi trong 1 giây và xử lý logic thực tế sau khi form được gửi, sau khi xử lý, đặt isSubmitting về false.
            } catch (error) {
                // Xử lý lỗi trong quá trình gửi form
                console.error('Lỗi khi gửi form:', error);
                actions.setSubmitting(false);
            };
            await createUserWithEmailAndPassword(auth, `${formData.username}@blackcat.club`, formData.password).then(async (userCredential) => {
                const user = userCredential.user;
                await setDoc(doc(database, "blackcat-account", user.uid), {
                    profileImage: formData.profileImage,
                    displayName: formData.displayName,
                    timestamp: getCurrentTime(),
                    username: formData.username,
                    password: formData.password,
                    emailVerified: false,
                    isAdmin: false,
                    uid: user.uid,
                    favouritePlaylist: [],
                    favouriteArtist: [],
                    favouriteSongs: [],
                });
                dispatch(authAction.setUserInfo({
                    displayName: formData.displayName,
                    userName: formData.username,
                    emailVerified: false,
                    photoURL: null,
                    isAdmin: false,
                    uid: user.uid,
                }));
                setTimeout(() => actions.resetForm({
                    values: {
                        username: "",
                        password: "",
                        repeatPassword: "",
                        profileImage: "",
                    },
                }), 1000);
                toast.success("Đăng ký Thành Công ");
                setTimeout(() => navigate("/"), 700);
            }).catch((error) => {
                console.log(error);
                return toast("Đăng ký Không Thành Công ", {
                    type: "error",
                });
            });
        },
    });
    // Render component chính
    return (
        <form onSubmit={formik.handleSubmit} name="loginForm" className="loginForm w-full">
            {['displayName', 'username', 'password', 'repeatPassword'].map((field) => (
                <div key={field} className="form-group">
                    <input
                        className={`form-control ${field === "username" ? "email" : "password"}`}
                        type={field === 'password' || field === 'repeatPassword' ? 'password' : 'text'}
                        name={field}
                        value={formik.values[field]}
                        onChange={formik.handleChange}
                        placeholder={field === "displayName" ? "Tên người dùng" : field === "username" ? "Tên tài khoản" : field === "password" ? "Mật khẩu" : "Nhập lại mật khẩu"}
                    />
                    {formik.errors[field] && formik.touched[field] && (
                        <div className="mt-[6px] px-[1rem] text-red-500">
                            <p>{formik.errors[field]}</p>
                        </div>
                    )}
                </div>
            ))}
            <button type="submit" className="btn-login" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Đang xử lý..." : "Đăng ký"}
            </button>
        </form>
    );
});

export default Reginster;