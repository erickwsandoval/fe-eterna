import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpp67SzNFKnjhoLzHABk2Cdiobw5dQndc",
  authDomain: "fe-eterna-25e20.firebaseapp.com",
  projectId: "fe-eterna-25e20",
  storageBucket: "fe-eterna-25e20.firebasestorage.app",
  messagingSenderId: "388648911830",
  appId: "1:388648911830:web:1841684ac4e88026dd9a77"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, setDoc };
