import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeivyeuoEThEnaZBu0tAhsra3vgNjvRfI",
    authDomain: "library-app-33486.firebaseapp.com",
    projectId: "library-app-33486",
    storageBucket: "library-app-33486.appspot.com",
    messagingSenderId: "112596788698",
    appId: "1:112596788698:web:b487215afbf5206b0c0ce3",
    measurementId: "G-TSR4K7G0BM"
  };

const app = initializeApp(firebaseConfig);

let db = getFirestore(app);

export default db;