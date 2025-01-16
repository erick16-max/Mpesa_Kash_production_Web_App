"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoader from "../components/general/PageLoader";
import { useTokenHandler } from "@/hooks/useTokenHandler";
import { auth } from "@/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const page = () => {
  const router = useRouter();

  // Handle tokens on entry
  useTokenHandler();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/finishaccount");
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
 
  }, [router]);


  return <PageLoader />;
};

export default page;
