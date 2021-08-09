import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


let firebaseConfig = {
  apiKey: "AIzaSyB6tHwlxvP0awd_drZzYZEVnM-dg8r7FAk",
  authDomain: "recetario-607a0.firebaseapp.com",
  projectId: "recetario-607a0",
  storageBucket: "recetario-607a0.appspot.com",
  messagingSenderId: "26779463143",
  appId: "1:26779463143:web:a1b22a79962d822c77e142",
  databaseURL: "https://recetario-607a0-default-rtdb.firebaseio.com/",
  storageBucket: "gs://recetario-607a0.appspot.com/"
};

//Inicializacion del firebase
firebase.initializeApp(firebaseConfig);

//Firebase
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
