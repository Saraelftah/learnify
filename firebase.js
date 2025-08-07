import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcCkS-Y3zxLB1POw0sW2jwpLTiuwBIy_k",
  authDomain: "bookingapp-ea10b.firebaseapp.com",
  projectId: "bookingapp-ea10b",
  storageBucket: "bookingapp-ea10b.firebasestorage.app",
  messagingSenderId: "1007501029206",
  appId: "1:1007501029206:web:2b8d19663894e7b16df0f7",
  measurementId: "G-NS72Q09NXQ"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);