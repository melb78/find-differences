import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB0P9moF_oBRXIat2DHEOg4gA3J4yTDGoM",
  authDomain: "find-differences-d9e3a.firebaseapp.com",
  databaseURL: "https://find-differences-d9e3a.firebaseio.com",
  projectId: "find-differences-d9e3a",
  storageBucket: "find-differences-d9e3a.appspot.com",
  messagingSenderId: "984652922244",
  appId: "1:984652922244:web:74a1d87d0eecc8afabf1d1",
  measurementId: "G-Y7BXK4S2LG",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
