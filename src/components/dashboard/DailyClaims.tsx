"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

interface IDailyClaims {
  token: string | null;
}

export default function DailyClaims({ token }: IDailyClaims) {
  const [ isLoading, setIsLoading ] = useState(false);

  async function claimPoints() {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://backend.decodingthefuture.xyz/api/v1/claim/index",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(!response.ok){
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      const data = await response.json();
      console.log(data)

      setIsLoading(false);
    } catch (error: any) {
      toast.error(`Already Claimed`);
      setIsLoading(false);
    }
  }
  return (
    <div className="lg:px-20 px-3 py-12 font-xeroda">
      <div className="bg-[#1B1E24] mb-7 text-center rounded-[10px] flex flex-col lg:flex-row items-center justify-between lg:py-16 p-11 px-10 lg:px-24">
        <div className="flex items-center space-x-3">
          <div
            style={{
              background:
                "linear-gradient(296.93deg, #FFE600 13.61%, #FFF7AD 110.94%)",
            }}
            className="w-[22px] lg:w-11 lg:h-11 h-[22px] rounded-full"
          ></div>
          <p className="text-4xl">1000</p>
        </div>
        <p className="text-2xl">Claim daily points every 24hrs</p>
      </div>
      <button onClick={claimPoints} disabled={isLoading} className="bg-[#0057FF] disabled:cursor-not-allowed w-full text-white rounded-[10px] text-2xl py-5">
      {isLoading ? <Spinner /> : "Claim"}
      </button>
    </div>
  );
}
