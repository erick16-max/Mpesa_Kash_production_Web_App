import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "@/firebase.config";

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

