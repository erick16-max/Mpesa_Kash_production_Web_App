import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyADUwjsaEPDQ--dwIqlRyXLbiNEkyfrBCA",
    authDomain: "deriv-mpesa-services.firebaseapp.com",
    databaseURL: "https://deriv-mpesa-services-default-rtdb.firebaseio.com",
    projectId: "deriv-mpesa-services",
    storageBucket: "deriv-mpesa-services.appspot.com",
    messagingSenderId: "642379634501",
    appId: "1:642379634501:web:b487752e7e86b079bb902c"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export both auth and db
