"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "@/firebase.config";
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic.js";

const TokenHandler = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async (token) => {
      try {
        // Establish WebSocket connection
        const connection = new WebSocket(
          "wss://ws.binaryws.com/websockets/v3?app_id=66601"
        );
        const api = new DerivAPIBasic({ connection });

        // Authorize with the token
        const authResponse = await api.authorize(token);
        console.log("Authorization Response:", authResponse);

        // Check if the user is virtual
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

        auth.onAuthStateChanged(async (session) => {
          if (session) {
            // Update database with user information
            await db.collection("users").doc(session?.uid).update({
              webToken: token,
              email: userDetails.email,
              userObject: userDetails,
            });
            router.push("/dashboard");
          } else {
            router.push("/finishaccount");
          }
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        router.push("/error"); // Redirect to an error page if needed
      }
    };

    const url = window.location.href;
    if (url.includes("token1=") && url.includes("&cur1=")) {
      const code = url.split("token1=")[1];
      const newCode = code.split("&cur1=")[0];

      // Save the token to localStorage
      localStorage.setItem("webToken", newCode);

      if(newCode){
        // Fetch user details
        fetchUserDetails(newCode);
      }
    }
  }, [router]);

  return null; // This component does not render any UI
};

export default TokenHandler;
