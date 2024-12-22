"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "@/firebase.config";

const TokenHandler = () => {
  const router = useRouter();

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("token1=") && url.includes("&cur1=")) {
      const code = url.split("token1=")[1];
      const newCode = code.split("&cur1=")[0];

      // Save the token to localStorage
      localStorage.setItem("webToken", newCode);

      auth.onAuthStateChanged(async (session) => {
        if (session) {
          db.collection("users")
            .doc(session?.uid)
            .update({
              webToken: newCode,
            })
            .then(() => {
              router.push("/dashboard");
            });
        } else {
          // No session, use localStorage to persist the token
          router.push("/finishaccount");
        }
      });
    }
  }, [router]);

  return null; // This component does not render any UI
};

export default TokenHandler;
