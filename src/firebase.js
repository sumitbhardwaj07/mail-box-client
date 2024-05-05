import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBdRnB1G5j4QnJnCW1Se2cpHKnshEc_gpQ",
    authDomain: "mail-box-client-3b0eb.firebaseapp.com",
    projectId: "mail-box-client-3b0eb",
    storageBucket: "mail-box-client-3b0eb.appspot.com",
    messagingSenderId: "263226243234",
    appId: "1:263226243234:web:6e83f205239795587b7ffb"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth, db }