"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function Home() {
  // const { token, setToken } = useGlobalState();
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      router.push("/dashboard")
    } else {
      router.push("/sign-up");
    }
  }, [token, router, setToken]);

  return(
    <div className="min-h-screen bg-black w-full">

    </div>
  );
}
