// Redux Toolkit được sử dụng để tạo slice
import { createSlice } from "@reduxjs/toolkit";
// Tạo slice "authSlice" để quản lý trạng thái người dùng
const authSlice = createSlice({
    name: "authentication",
    // Trạng thái ban đầu từ localStorage hoặc một trạng thái mặc định
    initialState: JSON.parse(localStorage.getItem("user-profile")) || {
       profileImage: null,
       activeUser: false,
       isAdmin: false,
       username: "",
       email: "",
       name: "",
    },
    // Các reducers định nghĩa cách thay đổi trạng thái dựa trên các action
    reducers: {
        // Reducer "setUserInfo": cập nhật thông tin người dùng và lưu vào localStorage
        setUserInfo: (state, action) => {
            state.profileImage = action.payload.setPhotoURL;
            state.username = action.payload.setUserName;
            state.isAdmin = action.payload.isAdmin;
            state.email = action.payload.setEmail;
            state.name = action.payload.setName;
            state.activeUser = true;
            localStorage.setItem("user-profile", JSON.stringify(state));
        },
        // Reducer "logOut": đăng xuất và đặt trạng thái về giá trị mặc định
        logOut: (state, action) => {
            state.profileImage = null;
            state.activeUser = false;
            state.isAdmin = false;
            state.username = "";
            state.email = "";
            state.name = "";
            localStorage.removeItem("user-profile");
        },
    },
});
// Xuất các action creators và reducer
export const { setUserInfo, logOut } = authSlice.actions;
export default authSlice.reducer;