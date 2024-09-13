import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC4XZ5AUqhknds6kuIExqu-he8fD_JXx_M",
    authDomain: "esg-uct.firebaseapp.com",
    projectId: "esg-uct",
    storageBucket: "esg-uct.appspot.com",
    messagingSenderId: "1032274958526",
    appId: "1:1032274958526:web:12966594b23d8e3ea126ef",
    measurementId: "G-DTZ3Z234ZM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();