import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpp67SzNFKnjhoLzHABk2Cdiobw5dQndc",
  authDomain: "fe-eterna-25e20.firebaseapp.com",
  projectId: "fe-eterna-25e20",
  storageBucket: "fe-eterna-25e20.firebasestorage.app",
  messagingSenderId: "388648911830",
  appId: "1:388648911830:web:1841684ac4e88026dd9a77"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  signInWithRedirect(auth, provider);
};

export const handleRedirect = async () => {
  const result = await getRedirectResult(auth);
  return result?.user;
};
