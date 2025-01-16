"use client";

import { useRouter } from "next/navigation";
import { db, auth } from "@/firebase.config";
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic.js";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

export const useTokenHandler = async () => {
  const router = useRouter();
  if (typeof window === undefined){
    console.log("window still not available...")
    return
  }

  console.log("we passed, lets keep running")

  try {
    const url = window.location.href;
    console.log("url", url)

    if (url.includes("token1=") && url.includes("&cur1=")) {
      const code = url.split("token1=")[1];
      const newCode = code.split("&cur1=")[0];

      // Save the token to localStorage
      localStorage.setItem("webToken", newCode);

      if (newCode) {
        const connection = new WebSocket(
          "wss://ws.binaryws.com/websockets/v3?app_id=66601"
        );
        const api = new DerivAPIBasic({ connection });

        // Authorize with the token
        const authResponse = await api.authorize(newCode);
        console.log("Authorization Response:", authResponse);

        const isVirtual = authResponse?.authorize?.is_virtual;
        const userDetails = authResponse?.authorize;

        if (isVirtual) {
          console.log("Virtual accounts are not allowed");
          router.push("/"); // Redirect to a page for virtual account error
          return;
        }

        // Save user details to localStorage
        localStorage.setItem("userEmail", JSON.stringify(userDetails.email));
        localStorage.setItem("userObject", JSON.stringify(userDetails));

        // Update Firebase user information
        auth.onAuthStateChanged(async (session) => {
          if (session) {
            const userRef = doc(db, "users", session?.uid);
            const userDoc = await getDoc(userRef);
            console.log("updating authenticated user")

            if (userDoc.exists()) {
              // Update existing user document
            console.log("updating user obj")

              await updateDoc(userRef, {
                webToken: newCode,
                email: userDetails.email,
                userObject: userDetails,
              });
            } else {
              // Create a new user document if it doesn't exist
            console.log("create new user obj")

              await setDoc(userRef, {
                webToken: newCode,
                email: userDetails.email,
                userObject: userDetails,
                createdAt: new Date().toISOString(),
              });
            }

            router.push("/dashboard");
          } else {
            localStorage.setItem("tokenAuth", url);
            console.log("updated token url")
          }
        });
      }
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    router.push("/error");
  }
};
