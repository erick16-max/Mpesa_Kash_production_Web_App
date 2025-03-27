import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA69n5GtDvqTD4b8h1wMHj8WCP30zh1I-k",
  authDomain: "deriv-mpesa-cash.firebaseapp.com",
  projectId: "deriv-mpesa-cash",
  storageBucket: "deriv-mpesa-cash.appspot.com",
  messagingSenderId: "962663119317",
  appId: "1:962663119317:web:0ed033318ecb730ce1255c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export both auth and db
