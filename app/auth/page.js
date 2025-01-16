"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoader from "../components/general/PageLoader";
import { useTokenHandler } from "@/hooks/useTokenHandler";
import { onAuthStateChanged } from "firebase/auth";

const page = () => {
  const router = useRouter();

  // Handle tokens on entry
  useTokenHandler();

  useEffect(() => {
   onAuthStateChanged(async (session) => {
    if(session){
      router.push("/dashboard");
    }else{
      router.push("/finishaccount");
    }
   })
   
 
  }, [router]);


  return <PageLoader />;
};

export default page;
