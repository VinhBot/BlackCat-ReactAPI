import { object as yupObject, string as yupString } from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import React from "react";

import { auth, database } from "../../assets/firebase-config.js";
import { authAction } from "../../assets/redux/stores.js";

const LoginPage = React.memo(({ dispatch, navigate }) => {
    // Sử dụng useFormik hook để quản lý biểu mẫu và xác thực
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        // Chọn schema xác thực tùy thuộc vào trạng thái đăng ký
        validationSchema: yupObject({
            // Kiểm tra và yêu cầu nhập tên người dùng
            username: yupString("Nhập tên tài khoản").required("Vui lòng nhập tên tài khoản").min(3, "Tài khoản quá ngắn!").max(40, "Tài khoản quá dài!"),
            // Kiểm tra và yêu cầu nhập mật khẩu
            password: yupString("Nhập mật khẩu").required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu quá ngắn!").max(50, "Mật khẩu quá dài!"),
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
            await signInWithEmailAndPassword(auth, `${formData.username}@blackcat.club`, formData.password).then((users) => {
                getDoc(doc(database, "blackcat-account", users.user.uid)).then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        // Thiết lập thông tin người dùng sau khi đăng nhập thành công
                        dispatch(authAction.setUserInfo({
                            emailVerified: userData.emailVerified,
                            displayName: userData.displayName,
                            photoURL: userData.profileImage,
                            userName: userData.username,
                            isAdmin: userData.isAdmin,
                            email: userData.email,
                            uid: users.user.uid,
                        }));
                    } else {
                        console.log("Không có sẵn dữ liệu");
                    };
                    // Xóa hết giá trị trong biểu mẫu đăng nhập nếu người dùng đăng nhập thành công.
                    setTimeout(() => actions.resetForm({
                        values: {
                            username: "",
                            password: "",
                        },
                    }), 1000);
                    // Đưa ra thông báo nếu người dùng đăng nhập thành công.
                    toast.success("Đăng Nhập Thành Công");
                    // Đưa người dùng về trang chủ sau 7 mili giây.
                    setTimeout(() => navigate("/"), 700);
                }).catch((error) => {
                    console.error("Có lỗi khi tìm nạp dữ liệu ", error);
                });
            }).catch((error) => {
                toast("Đăng Nhập không thành công , Tài Khoản hoặc Mật Khẩu không chính xác", {
                    type: "error",
                });
                // Xóa mật khẩu nếu người dùng đăng nhập sai tên tài khoản hoặc mật khẩu.
                setTimeout(() => actions.resetForm({
                    values: {
                        username: formData.username,
                        password: "",
                    },
                }), 1000);
            });
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} name="loginForm" className="loginForm w-full">
            {['username', 'password'].map((field) => (
                <div key={field} className="form-group">
                    <input
                        className={`form-control ${field === "username" ? "email" : "password"}`}
                        type={field === "password" ? "password" : "text"}
                        name={field}
                        value={formik.values[field]}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder={field === "username" ? "Tên tài khoản" : "Mật khẩu"}
                    />
                    {formik.errors[field] && formik.touched[field] && (
                        <div className="mt-[6px] px-[1rem] text-red-500">
                            <p>{formik.errors[field]}</p>
                        </div>
                    )}
                </div>
            ))}
            <button type="submit" className="btn-login" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
            </button>
        </form>
    );
});

export default LoginPage;