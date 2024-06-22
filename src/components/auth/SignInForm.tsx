"use client";
import { useState } from "react";
import InputBox from "../InputBox";
import Link from "next/link";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="w-full">
      <div className="mb-4">
        <InputBox
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(newValue: string) => {
            setEmail(newValue);
          }}
        />
      </div>

      <div className="mb-4">
        <InputBox
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(newValue: string) => {
            setPassword(newValue);
          }}
        />
      </div>

      <button className="uppercase bg-[#0057FF] text-white text-xl py-4 lg:text-3xl lg:py-5 w-full rounded-[10px]">
        LOG IN
      </button>

      <p className="mt-3 text-base lg:text-xl">
        Don&apos;t have an account yet?{" "}
        <Link href="/sign-up" className="text-[#0768fe]">
          Sign up today
        </Link>
      </p>
    </form>
  );
}
