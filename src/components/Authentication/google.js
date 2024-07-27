import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { authAction } from "../../assets/redux/stores.js";
import { getCurrentTime } from "../../assets/functions.js";
import { auth, database } from "../../assets/firebase-config.js";

const googleSignIn = ({ dispatch, navigate }) => {
    const provider = new GoogleAuthProvider(); // Tạo ra một instance của GoogleAuthProvider
    // Mở cửa sổ đăng nhập Popup sử dụng GoogleAuthProvider và xử lý kết quả.
    signInWithPopup(auth, provider).then(async ({ user }) => {
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

export default googleSignIn;