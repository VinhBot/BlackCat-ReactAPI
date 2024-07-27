import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
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