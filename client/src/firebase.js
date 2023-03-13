import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWNFgxYWf2ar5sU1PhfAAIQTVwSvJivGg",
  authDomain: "aura-5911c.firebaseapp.com",
  projectId: "aura-5911c",
  storageBucket: "aura-5911c.appspot.com",
  messagingSenderId: "750355590368",
  appId: "1:750355590368:web:15be9ae25b143877bab485",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
