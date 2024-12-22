"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoader from "../components/general/PageLoader";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to /finishaccount directly
    router.push("/finishaccount");
 
  }, [router]);


  return <PageLoader />; // No UI is rendered, just redirecting.
};

export default page;
