import React from "react";

export default function DailyClaims() {
  return (
    <div className="lg:px-20 px-11 py-12 font-xeroda">
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
      <button className="bg-[#0057FF] w-full text-white rounded-[10px] text-2xl py-5">
        Claim
      </button>
    </div>
  );
}
