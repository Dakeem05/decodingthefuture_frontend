"use client";
import SignUpForm from "@/components/auth/SignUpForm";
import { useGlobalState } from "@/context/GlobalStateContext";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUp() {
  // const {  completeRegistration,  } = useGlobalState();
  const [completeRegistration, setCompleteRegistration] = useState(false)
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const referralCode = searchParams.get("ref");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      router.push("/dashboard")
    } else if (token && completeRegistration) {
      router.push("/dashboard");
    }
  }, [completeRegistration, token, router, setToken]);

  // useEffect(() => {
  //   const storedToken = sessionStorage.getItem("token");
  //   console.log(storedToken)

  //   if (storedToken) {
  //     router.push("/sign-up");
  //   }
   
  // });

  // useEffect(() => {
  //   if (token && completeRegistration) {
  //     // If token exists, redirect to dashboard
  //     router.push("/dashboard");
  //   }
  //   // No need for else condition, as user should stay on sign-up page if no token
  // }, [token, router, completeRegistration]);

  return (
    <div>
      <div className="lg:flex flex-col items-start justify-center h-screen ">
        <h1 className="lg:text-3xl text-xl mb-3 lg:mb-9">
          Sign up to Decoding The Future Quest{" "}
        </h1>
        <SignUpForm refCode={referralCode} />
      </div>
    </div>
  );
}
