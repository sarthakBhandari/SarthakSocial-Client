import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDSNBCh65SIsXBvbKzp9hs_7wZK7_FIQfY",
  authDomain: "sarthaksocial-a49d1.firebaseapp.com",
  projectId: "sarthaksocial-a49d1",
  storageBucket: "sarthaksocial-a49d1.appspot.com",
  messagingSenderId: "559394031947",
  appId: "1:559394031947:web:24d8ffa19f24af452ec0ce",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const storage = firebase.storage();
export { db, storage };
