import firebase from "firebase";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBXnk9BiOd8aGBflXuDUJpMPHJogAHsrns",
  authDomain: "contaz-pl.firebaseapp.com",
  databaseURL: "https://contaz-pl.firebaseio.com",
  projectId: "contaz-pl",
  storageBucket: "contaz-pl.appspot.com",
  messagingSenderId: "539165494457",
  appId: "1:539165494457:web:3591cd06378471fe26df68",
  measurementId: "G-RMH1D4G5YW"
});

export default firebaseApp.firestore();
