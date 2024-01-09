/*================== npm package ==========================*/
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
// Import file
import { setUserInfo } from "../assets/redux/Features/authFeatures.js";
import { SignUpStyles } from "../assets/styledComponents.js";
import { AxiosAPI } from "../assets/api.js";
/*========================================================
# Biểu mẫu đăng nhập, đăng ký
========================================================*/
const AuthenticationPage = () => {
    const clickerErr = () => toast.warning("Hiện phương thức đăng nhập này giện đang được phát triển vui lòng quay lại sau");
    const [isSignUp, setIsSignUp] = useState(true); // State để theo dõi trạng thái đăng ký hoặc đăng nhập
    // Hooks và các biến cần thiết
    const dispatch = useDispatch(); // Hook để gọi các action từ Redux
    const navigate = useNavigate(); // Hook để điều hướng trang
    // Tạo nội dung của biểu mẫu đăng nhập và đăng xuất
    let Content;
    // Biểu mẫu đăng nhập
    if(isSignUp) Content = React.memo(() => {
        // Sử dụng useFormik hook để quản lý biểu mẫu và xác thực
        const formik = useFormik({
            initialValues: {
                username: "",
                password: "",
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
                return AxiosAPI.getSignInForm(formData).then((response) => {
                    const userData = response.data.result;
                    // Thiết lập thông tin người dùng sau khi đăng nhập thành công
                    dispatch(setUserInfo({
                        setPhotoURL: userData.profileImage || null,
                        setUserName: userData.username,
                        setEmail: userData.email,
                        setName: userData.name,
                        isAdmin: userData.isAdmin,
                    }));
                    // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
                    setTimeout(() => navigate("/"), 100);
                    toast.success("Đăng nhập thành công");
                }).catch((error) => { // Ghi log nếu có lỗi xảy ra trong quá trình đăng nhập
                    console.log(error);
                    formikHand.resetForm({
                        values: {
                            username: formData.username,
                            password: ""
                        },
                    });
                    let errorMessage;
                    if (error.response.status === 404) {
                        errorMessage = "Tên tài khoản không đúng, vui lòng kiểm tra lại";
                    } else if (error.response.status === 400) {
                        errorMessage = "Sai mật khẩu, vui lòng kiểm tra lại";
                    } else {
                        errorMessage = "Đã có lỗi xảy ra, vui lòng thử lại sau";
                    };
                    toast.warn(errorMessage);
                });
            },
            validationSchema: Yup.object({
                // Kiểm tra và yêu cầu nhập tên người dùng
                username: Yup.string("Nhập tên tài khoản").required("Vui lòng nhập tên tài khoản").min(3, "Tài khoản quá ngắn!").max(40, "Tài khoản quá dài!"),
                // Kiểm tra và yêu cầu nhập mật khẩu
                password: Yup.string("Nhập mật khẩu").required("Vui lòng nhập mật khẩu"),
            }),
        });
        return (
            <div>
                <form onSubmit={formik.handleSubmit} name="loginForm" className="loginForm w-full">
                    {['username', 'password'].map((field) => (
                        <div key={field} className="form-group">
                            <input
                                className={`form-control ${field === "username" ? "email" : "password"}`}
                                type={field === "password" ? "password" : "text"}
                                name={field}
                                value={formik.values[field]}
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
                    <button type="submit" className="btn-login" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        );
    });
    // Biểu mẫu đăng ký
    if(!isSignUp) Content = React.memo(() => {
        // Sử dụng useFormik hook để quản lý biểu mẫu và xác thực
        const formik = useFormik({
            initialValues: {
                name: "",
                username: "",
                password: "",
                repeatPassword: "",
            },
            onSubmit: async (formData, formikHand) => {
                return AxiosAPI.getSignUpForm(formData).then((data) => {
                    const userData = data.data.result;
                    // Thiết lập thông tin người dùng
                    dispatch(setUserInfo({
                        setUserName: userData.username,
                        setName: userData.name,
                        isAdmin: false,
                    }));
                    // Chuyển hướng đến trang chủ sau khi đăng ký thành công
                    setTimeout(() => navigate("/"), 1000);
                }).catch((error) => { // Ghi log nếu có lỗi xảy ra trong quá trình đăng ký
                    if (error.response.status === 400) {
                        return toast.error("Tài khoản đã được đăng ký trước đó.");
                    };
                });
            },
            validationSchema: Yup.object({
                // Kiểm tra và yêu cầu nhập tên
                name: Yup.string("Nhập tên").required('Tên là bắt buộc').min(1, 'Tên quá ngắn!').max(20, 'Tên quá dài!'),
                // Kiểm tra và yêu cầu nhập tên người dùng (username)
                username: Yup.string('Nhập tên tài khoản').required('Tên tài khoản là bắt buộc').min(3, "Tên tài khoản quá ngắn").max(40, "Tên tài khoản quá dài"),
                // Kiểm tra và yêu cầu nhập mật khẩu
                password: Yup.string('Nhập mật khẩu').required('Mật khẩu là bắt buộc')
                // Định nghĩa quy tắc mật khẩu
                /*.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
                  message: "Vui lòng tạo một mật khẩu mạnh hơn"
                })*/,
                // Kiểm tra và yêu cầu nhập lại mật khẩu
                repeatPassword: Yup.string('Nhập lại mật khẩu').oneOf([Yup.ref('password')], 'Mật khẩu phải trùng khớp').required('Mật khẩu là bắt buộc'),
            }),
        });
        // Render component chính
        return (
            <div>
                <form onSubmit={formik.handleSubmit} name="loginForm" className="loginForm w-full">
                    {['name', 'username', 'password', 'repeatPassword'].map((field) => (
                        <div key={field} className="form-group">
                            <input
                                className={`form-control ${field === "username" ? "email" : "password"}`}
                                type={field === 'password' || field === 'repeatPassword' ? 'password' : 'text'}
                                name={field}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                placeholder={field === "name" ? "Tên" : field === "username" ? "Tên tài khoản" : field === "password" ? "Mật khẩu" : "Nhập lại mật khẩu"}
                            />
                            {formik.errors[field] && formik.touched[field] && (
                                <div className="mt-[6px] px-[1rem] text-red-500">
                                    <p>{formik.errors[field]}</p>
                                </div>
                            )}
                        </div>
                    ))}
                    <button type="submit" className="btn-login" onClick={formik.handleClick}>
                        Đăng ký
                    </button>
                </form>
            </div>
        );
    });
    return (
        <SignUpStyles>
            <div className="gird wide">
                <div className="flex w-full h-[100vh] items-center justify-center">
                    <div className=" mb-[5rem] l-8 m-10 c-12">
                        <div className="row !flex-wrap authForm">
                            <div className="col l-5 m-5 c-12 left flex items-center justify-center ">
                                <div className="sider">
                                    <div className="sider_brand-item">
                                        <div className="sider_brand-item-img">
                                            <img src="/avatarMain.png" alt="logo" />
                                        </div>
                                        <p className="sider_brand-item-text">
                                            <Link to="/">BlackCat-Club</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-center mb-[2rem] font-semibold">Đăng nhập bằng mạng xã hội để truy cập nhanh</div>
                                <div className="flex flex-col justify-start items-center gap-[16px]">
                                    <button onClick={clickerErr} className="btnAuth bg-[#3b5998]">Tiếp tục với Facebook</button>
                                </div>
                            </div>
                            <div className="col l-7 m-7 c-12 right">
                                <div className="flex items-baseline justify-center ">
                                    <div className="text-header active">{isSignUp ? "Đăng Nhập" : "Đăng Ký"}</div>
                                </div>
                                <Content />
                                <div className="flex items-center justify-between mt-[20px]">
                                    <button onClick={() => setIsSignUp(!isSignUp)} className="underline">
                                        {isSignUp ? "Bạn chưa có tài khoản? Đăng ký" : "Bạn đã có tài khoản? Đăng nhập"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SignUpStyles>
    );
};

export default AuthenticationPage;