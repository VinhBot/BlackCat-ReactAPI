import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/Features/authFeatures";
import { getCurrentTime } from "../functions";
// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyC7lK6IJGkn1NmqQbs9TUiH6EWzxuFQd-k",
    authDomain: "blackcat-club.firebaseapp.com",
    projectId: "blackcat-club",
    storageBucket: "blackcat-club.appspot.com",
    messagingSenderId: "1064336897305",
    appId: "1:1064336897305:web:6859e3ba3ed61208ac4188",
    measurementId: "G-K8PJWHNTY0"
});
export const database = getFirestore(app);
export const auth = getAuth(app);
// Bảng điều khiển đăng nhập bằng trang mạng xã hội.
export function handlerSignIn() {
    const dispatch = useDispatch(); // Hook để gọi các action từ Redux
    const navigate = useNavigate();
    // Xử lý sự kiện khi người dùng nhấn vào nút "Sign in with Google".
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider(); // Tạo ra một instance của GoogleAuthProvider
        // Mở cửa sổ đăng nhập Popup sử dụng GoogleAuthProvider và xử lý kết quả.
        signInWithPopup(auth, provider).then(async({ user }) => {
            const userDocRef = doc(database, "blackcat-account", user.uid); // Lấy thông tin người dùng đã đăng nhập thành công và cập nhật trạng thái.
            const userData = await getDoc(userDocRef); // Kiểm tra nếu người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
            const data = userData.data(); // Lấy thông tin người dùng từ cơ sở dữ liệu
            if (!userData.exists()) {
                // Nếu người dùng chưa tồn tại, tạo mới tài liệu người dùng
                await setDoc(userDocRef, {
                    emailVerified: user.emailVerified,
                    displayName: user.displayName,
                    timestamp: getCurrentTime(),
                    uid: user.uid,
                    isAdmin: false,
                    favouritePlaylist: [],
                    favouriteArtist: [],
                    favouriteSongs: [],
                });
            };
            // Cập nhật trạng thái người dùng
            dispatch(authAction.setUserInfo({
                emailVerified: user.emailVerified,
                displayName: user.displayName,
                photoURL: user.photoURL,
                isAdmin: data.isAdmin,
                userName: user.email,
                email: user.email,
                uid: user.uid,
            }));
            // Điều hướng về trang chủ
            navigate("/");
        }).catch((error) => console.error(error));
    };
    // Xử lý sự kiện khi người dùng nhấn vào nút "Sign out"
    const handleSignOut = () => signOut(auth).then(() => {
        // Đăng xuất người dùng và cập nhật trạng thái.
        console.log("Đã đăng xuất người dùng.")
    }).catch((error) => console.error(error));
    // Render giao diện dựa trên trạng thái của người dùng
    return { googleSignIn, handleSignOut };
};