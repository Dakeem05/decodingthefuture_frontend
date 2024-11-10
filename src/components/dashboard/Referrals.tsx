"use client";

import { useState } from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { useGlobalState } from "@/context/GlobalStateContext";

interface IReferral {
  referralCode: string;
  userReferralData: {
    name: string;
    point: number;
  }[];
}

export default function Referrals({
  referralCode,
  userReferralData,
}: IReferral) {
  const [code, setCode] = useState(
    `https://decodingthefuture.xyz/sign-up?ref=${referralCode}`
  );

  

  const copyRefLink = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    copy(code);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="lg:px-20 px-3 py-12 font-xeroda">
      <div className="flex mb-8 mx-auto items-center space-x-5">
        <div className="py-4 truncate flex-1 px-8 bg-[#1B1E24] rounded-[10px]">
          <input
            type="text"
            value={code}
            className="truncate w-full bg-transparent text-sm lg:text-base outline-none"
            disabled
          />
        </div>
        <button
          onClick={copyRefLink}
          className="bg-[#0057FF] py-4 px-8 lg:px-24 rounded-[10px] text-sm lg:text-base"
        >
          Copy
        </button>
      </div>

      <div className="flex mb-5 justify-between text-base lg:text-3xl items-center">
        <p className="">Total Invites ({userReferralData.length})</p>
      </div>

      {userReferralData.length < 1 ? (
        <div className="bg-[#1B1E24] w-full py-14 rounded-[10px]">
          <p className="text-2xl lg:text-5xl text-center">No Referrals yet</p>
        </div>
      ) : (
        <div className="bg-[#1B1E24] rounded-[10px] mt-4 px-2 py-3">
          {userReferralData.map((data, index) => {
            return (
              <div
                key={index}
                className="bg-[#0F1114] rounded-[10px] py-3 px-3 lg:px-7 last:mb-0 mb-4 text-base flex items-center space-x-2 lg:text-lg"
              >
                <p>{index + 1}.</p>
                <div className="flex items-center flex-grow space-x-2">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#0057FF] rounded-full"></div>
                  <p>{data.name}</p>
                </div>

                <div className="flex items-center space-x-1">
                  <div
                    style={{
                      background:
                        "linear-gradient(296.93deg, #FFE600 13.61%, #FFF7AD 110.94%)",
                    }}
                    className="w-4 h-4 rounded-full"
                  ></div>
                  <p>{data.point}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
