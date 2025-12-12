import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIYyyt8PtwddQR3HPMbTDHr3EGd6iFHSY",
  authDomain: "quiz-a37bf.firebaseapp.com",
  projectId: "quiz-a37bf",
  storageBucket: "quiz-a37bf.appspot.com",   
  messagingSenderId: "1015042156328",
  appId: "1:1015042156328:web:8ad9e9ca4a094275b0921d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
