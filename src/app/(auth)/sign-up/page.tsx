import SignUpForm from "@/components/auth/SignUpForm";
import React from "react";

export default function SignUp() {
  return (
    <div>
      <div className="lg:flex flex-col items-start justify-center h-screen ">
        <h1 className="lg:text-3xl text-xl mb-3 lg:mb-9">Sign up to Decoding The Future Quest </h1>
        <SignUpForm />
      </div>
    </div>
  );
}
