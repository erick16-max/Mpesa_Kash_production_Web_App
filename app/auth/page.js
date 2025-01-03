"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoader from "../components/general/PageLoader";
import { useTokenHandler } from "@/hooks/useTokenHandler";

const page = () => {
  const router = useRouter();

  // Handle tokens on entry
  useTokenHandler();

  useEffect(() => {
    // Redirect the user to /finishaccount directly
    router.push("/finishaccount");
 
  }, [router]);


  return <PageLoader />; // No UI is rendered, just redirecting.
};

export default page;
