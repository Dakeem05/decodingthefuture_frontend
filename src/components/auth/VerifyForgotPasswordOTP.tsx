"use client";

import OTPInput from "react-otp-input";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

export default function VerifyForgotPasswordOTP() {
  let email = sessionStorage.getItem("emailToVerify");

  const [otp, setOtp] = useState("");
  const { setIsModalOpen, setForgotPasswordActive } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const router = useRouter();

  const verifyEmail = async () => {
    setOtpError("");
    setLoading(true);
    const formData = {
      email,
      otp,
    };

    try {
      const response = await fetch(
        "https://backend.decodingthefuture.xyz/api/v1/auth/verify-forgot-password",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "X-PINGOTHER": "pingpong",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = `HTTP error status: ${
          response.status
        }, Message: ${JSON.stringify(errorResponse.data)}`;

        if (errorResponse.data.otp) setOtpError(errorResponse.data.otp[0]);

        throw new Error(errorMessage);
      }

      const result = await response.json();


      setForgotPasswordActive(true);
      setLoading(false);
      toast.success(`${result.data}`);
      setIsModalOpen(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setOtpError("");
    const formData = {
        email,
      };
    try {
      const response = await fetch(
        `https://backend.decodingthefuture.xyz/api/v1/auth/resend-forgot-password`,
        {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "X-PINGOTHER": "pingpong",
            },
            body: JSON.stringify(formData),
          }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = `HTTP error status: ${
          response.status
        }, Message: ${JSON.stringify(errorResponse.data)}`;

        throw new Error(errorMessage);
      }

      const result = await response.json();

      toast.success(` ${result.data}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="w-full">
        <h1 className="lg:text-3xl text-center text-xl mb-3 lg:mb-9">
          Enter the OTP that was sent to your mail.
        </h1>
      <div className="w-full mx-auto mb-3">
        <div className="w-max mx-auto">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              width: "3rem",
              height: "3rem",
              margin: "0 0.2rem",
              fontSize: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #0057FF",
              backgroundColor: "transparent",
              color: "white",
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        {otpError && <p className="text-red-500 text-center">{otpError}</p>}

        <div className="flex w-fit mx-auto mt-2 space-x-1 items-center  text-white text-sm">
          <p>Didn&apos;t get the code? </p>{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
                resendOTP();
            }}
            className="text-[#16A0FF] ml-0"
          >
            Resend
          </button>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          verifyEmail();
        }}
        disabled={loading}
        className=" bg-[#0057FF] disabled:cursor-not-allowed text-white text-xl py-4 lg:text-3xl lg:py-5 w-full rounded-[10px]"
      >
        {loading ? <Spinner /> : "Verify OTP"}
      </button>
    </form>
  );
}
