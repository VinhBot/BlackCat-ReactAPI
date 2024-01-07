import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// Tạo một phiên bản của axios với cấu hình cơ bản, sử dụng URL cơ sở từ blackcat-api.vercel.app
export const AxiosAPI = axios.create({
   // baseURL: "https://blackcat-api.vercel.app",
   baseURL: "http://localhost:5000",
   headers: {
      Authorization: `Bearer ${localStorage.getItem("user-profile") ? JSON.parse(localStorage.getItem("user-profile")).token : ""}`, // Thêm tiêu đề Authorization vào tất cả các yêu cầu
      "Content-Type": "application/json", // xác định loại nội dung đang gửi đi là JSON.
   },
});

export const ApiHandler = {
   // tạo phương thức đăng nhập tài khoản
   getSignInForm: async function (formData) {
      return this.request({
         method: "post",
         url: "/user/login",
         data: formData,
      });
   },
   // tạo phương thức đăng ký tài khoản
   getSignUpForm: function (formData) {
      return this.request({
         method: "post",
         url: "/user/signup",
         data: formData,
      });
   },
   // Phương pháp lấy endpoint theo lượt thích của người dùng
   getUserLikeEndpoint: function (username, { type, item } = {}) {
      return this.request({
         method: "post",
         url: `/user/${username}/like`,
         data: { type, item },
      });
   },
   // cập nhật trang cá nhân 
   updateProfile: function (username, changedValues) {
      return this.request({
         method: "patch",
         url: `/user/${username}`,
         data: changedValues,
      });
   },
   // Phương pháp thực hiện yêu cầu bằng client Axios đã được định cấu hình
   request: async (options) => {
      // Tạo một instance của Axios với baseURL cụ thể
      const customAxios = axios.create({
         // baseURL: "https://blackcat-api.vercel.app",
         baseURL: "http://localhost:5000/",
         headers: {
            Authorization: `Bearer ${localStorage.getItem("user-profile") ? JSON.parse(localStorage.getItem("user-profile")).token : ""}`, // Thêm tiêu đề Authorization vào tất cả các yêu cầu
            "Content-Type": "application/json", // xác định loại nội dung đang gửi đi là JSON.
         },
      });
      return await customAxios(options); // Thực hiện yêu cầu bằng Axios với các tùy chọn được truyền vào
   },
};
/*========================================================*/
export const useGetHomePage = () => useQuery({
   queryKey: ["getHotKey"],
   queryFn: () => ApiHandler.request({
      method: "get",
      url: "/api/home"
   }).then((data) => data.data),
   keepPreviousData: true
});
/*========================================================*/
export const useGetHomeChart = () => useQuery({
   queryKey: ["getChartPage"],
   queryFn: () => ApiHandler.request({
      method: "get",
      url: "/api/homechart",
   }).then((data) => data.data),
   keepPreviousData: true
});
/*========================================================*/
export const getNewSongRelease = () => useQuery({
   queryKey: ["getNewSongRelease"],
   queryFn: () => ApiHandler.request({
      method: "get",
      url: "/api/newreleasechart"
   }).then((data) => data.data),
   keepPreviousData: true
});
/*========================================================*/
export const getTop100page = () => useQuery({
   queryKey: ["getTop100Page"],
   queryFn: () => ApiHandler.request({
      method: "get",
      url: "/api/top100",
   }).then((data) => data.data),
   keepPreviousData: true
});
/*========================================================*/
export const useGetRadioPage = () => useQuery({
   queryKey: ["getRadioPage"],
   queryFn: () => ApiHandler.request({
      method: "get",
      url: "/api/radio"
   }).then((data) => data.data),
   keepPreviousData: true
});