import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const AxiosAPI = {
   // Lấy thông tin ListMv
   getListMv: function (id, page) {
      return this.request({ method: "get", url: `/api/listmv?id=${id}&page=${page}&count=19` }).then((result) => result.data.data);
   },
   // 
   getVideoMv: function(id) {
      return this.request({ method: "get", url: `/api/mv/${id}` }).then((result) => result.data.data);
   },
   // 
   getSuggestedAlbum: function(id) {
      return this.request({ method: "get", url: `/api/suggestedplaylists/${id}` }).then((result) => result.data.data);
   },
   // Lấy thông tin
   getSearchAllKey: function (id) {
      return this.request({ method: "get", url: `/api/searchall?keyword=${id}` }).then((result) => result.data.data);
   },
   // Lấy thông tin SearchByType
   getSearchByType: function (id, type) {
      return this.request({ method: "get", url: `/api/searchtype?keyword=${id}&type=${type}` }).then((result) => result.data.data);
   },
   // Lấy thông tin của getHotKeyApi
   getHotKey: function () {
      return this.request({ method: "get", url: "/api/recommendkeyword" }).then((data) => data.data.data);
   },
   // Lấy thông tin của ArtistPage
   getArtistPage: function (alias) {
      return this.request({ method: "get", url: `/api/artist/${alias}` }).then((result) => result.data.data);
   },
   // Lấy thông tin newFeed
   getNewFeed: function (id, current) {
      return this.request({ method: "get", url: `/api/newfeeds?id=${id}&page=${current}` });
   },
   // Lấy thông tin HubDetail
   getHubDetail: function (id) {
      return this.request({ method: "get", url: `/api/hubdetails/${id}` }).then((data) => data.data.data);
   },
   // Lấy thông tin CategoryMv
   getCategoryMv: function (id) {
      return this.request({ method: "get", url: `/api/categorymv/${id}` }).then((result) => result.data.data);
   },
   // Lấy thông tin AlbumPage
   getAlbumPage: function (id) {
      return this.request({ method: "get", url: `/api/playlist/${id}`, }).then((result) => result.data.data);
   },
   // Lấy thông tin HotSuggestion
   getHotSuggestion: function (name) {
      return this.request({ method: "get", url: `/api/suggestionkeyword?keyword=${name}`, }).then((response) => response.data.data.items);
   },
   // Lấy lời bài hát
   getLyrics: function (id) {
      return this.request({ method: "get", url: `/api/songlyrics/${id}` }).then((result) => result.data.data);
   },
   // tạo phương thức đăng nhập tài khoản
   getSignInForm: async function (formData) {
      return this.request({ method: "post", url: "/user/login", data: formData, });
   },
   // tạo phương thức đăng ký tài khoản
   getSignUpForm: function (formData) {
      return this.request({ method: "post", url: "/user/signup", data: formData, });
   },
   // 
   getAllDataUser: function(username) {
      return this.request({ method: "get", url: `/user/finduser/${username}` }).then((result) => result.data.data);
   },
    // Phương pháp lấy endpoint theo lượt thích của người dùng
    getUserLikeEndpoint: function (username, { type, item } = {}) {
      return this.request({ method: "post", url: `/user/${username}/like`, data: { type, item } });
   },
   // cập nhật trang cá nhân 
   updateProfile: function (username, changedValues) {
      return this.request({ method: "patch", url: `/user/${username}`, data: changedValues, });
   },
   // Lấy thông tin của trang chủ zing
   useGetHomePage: function () {
      return useQuery({
         queryKey: ["getHotKey"],
         queryFn: () => this.request({ method: "get", url: "/api/home" }).then((data) => data.data),
         keepPreviousData: true
      });
   },
   // Lấy thông tin NewSongRelease 
   getNewSongRelease: function () {
      return useQuery({
         queryKey: ["getNewSongRelease"],
         queryFn: () => this.request({ method: "get", url: "/api/newreleasechart" }).then((data) => data.data),
         keepPreviousData: true
      });
   },
   // Lấy thông tin chart 
   useGetHomeChart: function () {
      return useQuery({
         queryKey: ["getChartPage"],
         queryFn: () => this.request({ method: "get", url: "/api/homechart", }).then((data) => data.data),
         keepPreviousData: true
      });
   },
   // Lấy thông tin Top100page
   getTop100page: function () {
      return useQuery({
         queryKey: ["getTop100Page"],
         queryFn: () => this.request({ method: "get", url: "/api/top100", }).then((data) => data.data),
         keepPreviousData: true
      });
   },
   // Lấy thông tin GetRadioPage
   useGetRadioPage: function () {
      return useQuery({
         queryKey: ["getRadioPagSe"],
         queryFn: () => this.request({ method: "get", url: "/api/radio" }).then((data) => data.data),
         keepPreviousData: true
      });
   },
   // Phương pháp thực hiện yêu cầu bằng client Axios đã được định cấu hình
   request: async (options) => {
      // Tạo một instance của Axios với baseURL cụ thể
      const customAxios = axios.create({
         // baseURL: "https://blackcat-api.vercel.app",
         baseURL: "https://16bac973-a95d-403b-a6b2-a851da99cb05-00-c68sx25g7s8q.sisko.replit.dev",
         headers: {
            Authorization: `Bearer ${localStorage.getItem("user-profile") ? JSON.parse(localStorage.getItem("user-profile")).token : ""}`, // Thêm tiêu đề Authorization vào tất cả các yêu cầu
            "Content-Type": "application/json", // xác định loại nội dung đang gửi đi là JSON.
         },
      });
      return await customAxios(options); // Thực hiện yêu cầu bằng Axios với các tùy chọn được truyền vào
   },
};