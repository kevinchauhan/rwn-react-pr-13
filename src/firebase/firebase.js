// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDc4ROSrgOuDDL64sha4lsjNPJOS8tDCo4",
    authDomain: "pr-13-lab-management.firebaseapp.com",
    projectId: "pr-13-lab-management",
    storageBucket: "pr-13-lab-management.appspot.com",
    messagingSenderId: "905799648595",
    appId: "1:905799648595:web:1c67a5b044462726144da6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export default app