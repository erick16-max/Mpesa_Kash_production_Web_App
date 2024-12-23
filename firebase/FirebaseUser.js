import { db } from "@/firebase.config";
import { doc, setDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore"; // Correct Firestore imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export const getUserByEmail = async (email) => {
  try {
    if (!email) throw new Error("Email is required to query the user.");

    // Reference the 'users' collection
    const usersCollectionRef = collection(db, "users");

    // Create a query to find the user by email
    const userQuery = query(usersCollectionRef, where("email", "==", email));

    // Execute the query
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      console.log("No user found with the provided email.");
      return null; // Return null if no user is found
    }

    // Retrieve and return the user object
    const userDoc = querySnapshot.docs[0]; // Assuming only one user per email
    const userData = { id: userDoc.id, ...userDoc.data() };

    return userData;
  } catch (error) {
    console.log("Error fetching user by email: ", error.message);
    throw error; // Re-throw the error for further handling
  }
};

export const handleUserProfile = async (user, userObject, webToken, router) => {
  try {
    const userRef = doc(db, "users", user.uid); // Reference to the user's document
    const userData = {
      webToken,
      email: user.email,
      userObject,
    };

    // Update or set the user profile in Firestore
    await setDoc(userRef, userData, { merge: true });

    // Redirect based on user state
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        router.push("/dashboard");
      } else {
        router.push("/finishaccount");
      }
    });
  } catch (error) {
    console.error("Error saving user profile:", error.message);
  }
};
