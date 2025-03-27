"use client";

import { useRouter } from "next/navigation";
import { db, auth } from "@/firebase.config";
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic.js";
import { doc, updateDoc, getDoc, setDoc, serverTimestamp} from "firebase/firestore";
import { useContext } from "react";
import AppContext from "@/context/AppContext";


export const useTokenHandler = async () => {
  const {setRefreshing} = useContext(AppContext)
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

      // get tokens
      const regex = /acct(\d+)=(\w+)&token\d+=(\w+-\w+)/g;
      let match;
      const tokens = {};
  
      while ((match = regex.exec(url)) !== null) {
        const [, acctNumber, acctValue, fullToken] = match;
        tokens[acctValue] = { token: fullToken };
      }

      // Save the token to localStorage
      localStorage.setItem("webToken", newCode);

      if (newCode) {
        const connection = new WebSocket(
          "wss://ws.binaryws.com/websockets/v3?app_id=70471"
        );
        const api = new DerivAPIBasic({ connection });

        // Authorize with the token
        const authResponse = await api.authorize(newCode);
        console.log("Authorization Response:", authResponse);

        const isVirtual = authResponse?.authorize?.is_virtual;
        const userDetails = authResponse?.authorize;

        if (isVirtual) {
          console.log("Virtual accounts are not allowed");
          router.push("/virtual"); // Redirect to a page for virtual account error
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
                token: newCode,
                updatedAt: serverTimestamp()
              });
              router.push("/dashboard");
              setRefreshing(true)
            }

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
