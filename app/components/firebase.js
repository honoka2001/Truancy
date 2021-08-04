import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDlsH8ZoAr4c_KbuGXhBmSpMdUUwbdQaf0",
  authDomain: "truancy-6432b.firebaseapp.com",
  projectId: "truancy-6432b",
  storageBucket: "truancy-6432b.appspot.com",
  messagingSenderId: "583891211394",
  appId: "1:583891211394:web:dc2e09ff0970076472909b",
  measurementId: "G-RZNVGJFGYE",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

export default firebase;
