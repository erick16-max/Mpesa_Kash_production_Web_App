import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB79B2LeURUqluxRSAaieP6lic2eHkFvj8",
  authDomain: "deriva-add-pesa.firebaseapp.com",
  projectId: "deriva-add-pesa",
  storageBucket: "deriva-add-pesa.appspot.com",
  messagingSenderId: "806029103601",
  appId: "1:806029103601:web:6d4a3acc82e49de1117450",
  measurementId: "G-LDVRJRE7YT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export both auth and db
