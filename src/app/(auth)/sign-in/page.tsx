"use client";

import SignInForm from "@/components/auth/SignInForm";
import { useGlobalState } from "@/context/GlobalStateContext";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const { token, setToken } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      router.push("/dashboard");
    } else if (token) {
      router.push("/dashboard");
    }
  }, [token, router, setToken]);
  
  return (
    <div>
      <div className="lg:flex flex-col items-start justify-center h-screen">
        <h1 className="lg:text-3xl text-xl mb-3 lg:mb-9">
          Log in to Decoding The Future Quest{" "}
        </h1>
        <SignInForm />
        <p className="mt-5 text-center text-[#0768fe]"><Link href="/forgot-password">Forgot Password?</Link></p>
      </div>
    </div>
  );
}
