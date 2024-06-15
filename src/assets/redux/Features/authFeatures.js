// Redux Toolkit được sử dụng để tạo slice
import { createSlice } from "@reduxjs/toolkit";
// Tạo slice "authSlice" để quản lý trạng thái người dùng
const authSlice = createSlice({
    name: "authentication",
    // Trạng thái ban đầu từ localStorage hoặc một trạng thái mặc định
    initialState: JSON.parse(localStorage.getItem("user-profile")) || {
        emailVerified: false,
        profileImage: null,
        activeUser: false,
        isAdmin: false,
        displayName: "",
        username: "",
        email: "",
        uid: "",
    },
    // Các reducers định nghĩa cách thay đổi trạng thái dựa trên các action
    reducers: {
        // Reducer "setUserInfo": cập nhật thông tin người dùng và lưu vào localStorage
        setUserInfo: (state, action) => {
            state.emailVerified = action.payload.emailVerified;
            state.displayName = action.payload.displayName;
            state.profileImage = action.payload.photoURL;
            state.username = action.payload.userName;
            state.isAdmin = action.payload.isAdmin;
            state.email = action.payload.email;
            state.uid = action.payload.uid;
            state.activeUser = true;
            localStorage.setItem("user-profile", JSON.stringify(state));
        },
        // Reducer "logOut": đăng xuất và đặt trạng thái về giá trị mặc định
        logOut: (state, action) => {
            state.emailVerified = false;
            state.profileImage = null;
            state.activeUser = false;
            state.isAdmin = false;
            state.displayName = "";
            state.username = "";
            state.email = "";
            state.uid = "";
            localStorage.removeItem("user-profile");
        },
    },
});
// Xuất các action creators và reducer
export const { setUserInfo, logOut } = authSlice.actions;
export const authAction = authSlice.actions;
export default authSlice.reducer;