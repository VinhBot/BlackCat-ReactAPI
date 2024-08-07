import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import React from "react";

import { setPlaying } from "./assets/redux/Features/settingPlayFeatures.js";
import { auth, database } from "./assets/firebase-config.js";
import { setLocalStorageItem } from "./assets/functions.js";
import Siderleft from "./components/layout/Siderleft.jsx";
import BottomPlay from "./components/layout/Bottom.jsx";
import { authAction } from "./assets/redux/stores.js";
import Header from "./components/layout/Header.jsx";
import RouterPage from "./router/RouterPage";
// Component được đánh dấu là memo để tối ưu hoá render
const App = React.memo(() => {
    // Sử dụng useSelector để lấy state từ Redux
    const queueNowPlaySelector = useSelector((state) => state.queueNowPlay);
    const timeSelector = useSelector((state) => state.currentTimes);
    const settingSelector = useSelector((state) => state.setting);
    const loggedSelector = useSelector((state) => state.logged);
    const lyricsSelector = useSelector((state) => state.lyrics);
    const theme = useSelector((state) => state.themetoggle);
    const users = useSelector((state) => state.auth);
    // Sử dụng useDispatch để gửi các action đến Redux
    const dispatch = useDispatch();
    // Sử dụng useEffect để thực hiện các thao tác khi component được mount lên
    React.useEffect(() => {
        // Thiết lập một listener để theo dõi sự thay đổi trong trạng thái xác thực của người dùng.
        const unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
            if (user && user.email.endsWith('@gmail.com')) {
                const userData = await getDoc(doc(database, "blackcat-account", user.uid)).then((data) => data.data());
                dispatch(authAction.setUserInfo({
                    emailVerified: userData.emailVerified,
                    displayName: user.displayName,
                    isAdmin: userData.isAdmin,
                    photoURL: user.photoURL,
                    userName: user.email,
                    email: user.email,
                    uid: user.uid,
                }));
            };
        });
        // Hủy bỏ listener khi component bị unmount.
        return () => unregisterAuthObserver();
    }, [auth, dispatch]);
    // Sử dụng useEffect để lắng nghe sự kiện bàn phím và thực hiện các tác vụ tương ứng
    React.useEffect(() => {
        const keyboardShortcuts = (e) => {
            const isInput = Array.from(document.querySelectorAll("input")).some((input) => input === document.activeElement);
            if (isInput) return;
            if (e.keyCode === 32) {
                e.preventDefault();
                dispatch(setPlaying());
            } else if (e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 74 || e.keyCode === 76) {
                // Đối tượng ánh xạ mã phím sang các ID tương ứng
                const keyMap = {
                    39: "nextMusic",
                    37: "prevMusic",
                    74: "randomMusic",
                    76: "loopMusic",
                };
                document.querySelector(`#${keyMap[e.keyCode]}`).click();
            };
        };
        document.addEventListener("keydown", keyboardShortcuts);
        return () => document.removeEventListener("keydown", keyboardShortcuts);
        // eslint-disable-next-line
    }, []);
    // Sử dụng useLayoutEffect để cập nhật giao diện người dùng dựa trên theme
    React.useLayoutEffect(() => {
        const rootElement = document.documentElement;
        rootElement.setAttribute("data-theme", theme.dataTheme);
        rootElement.classList.toggle("theme-bg-image", theme.bgImg);
        rootElement.classList.toggle("zma", theme.bgPlaying);
        // Nếu có style được đặt, áp dụng style vào rootElement
        if (theme.dataStyle) {
            rootElement.setAttribute("style", theme.dataStyle.join(" ; "));
        } else {
            rootElement.removeAttribute("style");
        };
        // eslint-disable-next-line
    }, [theme]);
    // Sử dụng useLayoutEffect để đặt giá trị ban đầu cho localStorage
    React.useLayoutEffect(() => {
        setLocalStorageItem({ key: "queue_nowplay", value: queueNowPlaySelector });
        setLocalStorageItem({ key: "blackcat_logged", value: loggedSelector });
        setLocalStorageItem({ key: "blackcat_setting", value: settingSelector });
        setLocalStorageItem({ key: "blackcat_lyrics", value: lyricsSelector });
        setLocalStorageItem({ key: "blackcat_timeCurrent", value: timeSelector });
        // eslint-disable-next-line
    }, []);
    // Sự kiện chặn f12 và contextmenu
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            // if (e.key === "F12" || e.keyCode === 123) {
            //     e.preventDefault();
            // };
        };
        const handleContextMenu = (e) => {
            e.preventDefault();
            console.log("%cBạn không thể click chuột phải ở đây", "color: red;");
        };
        if (!users.isAdmin) {
            window.addEventListener("contextmenu", handleContextMenu);
            window.addEventListener("keydown", handleKeyDown);
        };
        // Hủy đăng ký sự kiện khi component unmount
        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
            window.removeEventListener("keydown", handleKeyDown);
        };
        // Không làm gì nếu không phải admin
    }, [users.isAdmin]);
    // JSX trả về cho component
    return (
        <>
            <div className={`main ${queueNowPlaySelector.currentEncodeId ? "" : "hide-bottom"}`} style={theme.bgImg ? { backgroundImage: `url('${theme.bgImg}')` } : {}}>
                <Header />
                <Siderleft />
                <BottomPlay />
                <RouterPage />
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover limit={5} />
            </div>
        </>
    );
});

// Xuất component để sử dụng trong ứng dụng
export default App;