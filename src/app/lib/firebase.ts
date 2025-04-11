// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-wdHQaWog1olZovROFj3EVCvuNOJmL0c",
  authDomain: "tech-connect-66068.firebaseapp.com",
  projectId: "tech-connect-66068",
  storageBucket: "tech-connect-66068.firebasestorage.app",
  messagingSenderId: "363435391418",
  appId: "1:363435391418:web:b379d17f8986d4ab330583",
  measurementId: "G-FY1HKGTQ6G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics only on the client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };