
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCamghUgrUSasS1VI1d0vpySaOSQH0qW9k",
  authDomain: "upload-d6395.firebaseapp.com",
  projectId: "upload-d6395",
  storageBucket: "upload-d6395.appspot.com",
  messagingSenderId: "5709107256",
  appId: "1:5709107256:web:da90f1d72f5b69282796cd"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)