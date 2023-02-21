// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZLbJfocPagXHS-FMxZAPlMvtc9ENmNO0",
  authDomain: "tokpay-admin.firebaseapp.com",
  projectId: "tokpay-admin",
  storageBucket: "tokpay-admin.appspot.com",
  messagingSenderId: "955436631628",
  appId: "1:955436631628:web:9559148025e13f5a8196e9"
};

//mobile app
  const firebaseConfigApp = {
    apiKey: "AIzaSyCjl0EiYmFmnwdlaW0fmN_MiyjvZ6VTmiI",
    authDomain: "tokpay-finance.firebaseapp.com",
    projectId: "tokpay-finance",
    storageBucket: "tokpay-finance.appspot.com",
    messagingSenderId: "484361014627",
    appId: "1:484361014627:web:118549a6d69aa716efd756",
    measurementId: "G-NR5MW15B9C"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfigApp);

export default app