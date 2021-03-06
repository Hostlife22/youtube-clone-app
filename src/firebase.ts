import { initializeApp } from "firebase/app";
import { getAuth, getIdToken, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAU-_FBkmp1yRR1Nn7ES5qnqU6dGopRiVo",
  authDomain: "clone-4994c.firebaseapp.com",
  projectId: "clone-4994c",
  storageBucket: "clone-4994c.appspot.com",
  messagingSenderId: "527812671233",
  appId: "1:527812671233:web:69a698ce492cd2ae38cd00",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

export { getIdToken, provider };

export default auth;
