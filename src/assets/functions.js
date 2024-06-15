// Lấy thông tin về ngày và giờ tạo tài khoản theo mốc giờ việt nam.
export function getCurrentTime() {
    // Tạo một đối tượng Date hiện tại.
    const currentDate = new Date();
    // Lấy thông tin về giờ, phút và giây.
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    // Lấy thông tin về ngày, tháng và năm.
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
    const year = currentDate.getFullYear();
    // Trả về chuỗi kết quả.
    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
};
/*========================================================*/
export const fancyTimeFormat = (duration, par) => {
    // Giờ, phút và giây
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;
    var ret = "";
    if (par) {
        if (hrs > 0) {
            ret += "" + hrs + " giờ";
        };
        ret += " " + mins + " phút" + (secs < 10 ? "0" : "");
        return ret;
    };
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    };
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
};
/*========================================================*/
export const formartTimeNewFeed = (time) => {
    var date = new Date(time * 1000);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var dates = new Date(null);
    dates.setSeconds(time);
    var results = date.toISOString().substr(11, 5);
    return `${day} tháng ${month} lúc ${results}`;
};
/*========================================================*/
export function formatTime(seconds) {
    let minutes;
    minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
};
/*========================================================*/
export const getConterTimeRelese = (timeRelease, isAlbum = false) => {
    const date = new Date();
    let day = Math.ceil(Math.ceil(date.getTime() / 1000 - timeRelease) / (3600 * 24));
    if (day >= 7) {
        day = "1 tuần"
    } else if (day >= 14) {
        day = "2 tuần"
    } else {
        day += " ngày"
    };
    return day;
};
/*========================================================*/
export const getFormartMiute = (time) => Math.floor(time / 60);
/*========================================================*/
export const getFormartTimeDDYY = (time) => {
    var date = new Date(time * 1000);
    return `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`
};
/*========================================================*/
export const scrollTop = () => {
    const main = document.querySelector("#scrollableDiv");
    main.scrollTo({ top: 0, left: 0 });
    return;
};
/*========================================================*/
export const scrollToActive = (e) => setTimeout(() => e?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }), 200);
/*========================================================*/
 // Hàm giúp đặt giá trị vào localStorage một cách an toàn
export const setLocalStorageItem = ({ key, value }) => {
    if (!JSON.parse(localStorage.getItem(key))) {
        localStorage.setItem(key, JSON.stringify(value));
    };
};