import Rankings from "@/components/leaderboard/Rankings";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";

export default function Leaderboard() {
  return (
    <div className="font-xeroda">
      <div
        style={{
          background: "linear-gradient(93.77deg, #0057FF 0%, #16A0FF 95.76%)",
        }}
        className="h-[340px] w-full lg:px-16 px-9 pt-9 lg:pt-10"
      >
        <div className="flex h-full flex-col items-stretch">
          <div className="flex items-center justify-between">
            <FaArrowLeft className="lg:w-11 lg:h-11 w-[22px] h-[22px]" />
            <p className="lg:text-4xl text-xl">Leaderboard</p>
            <div className="">
              <div className="lg:hidden">
                <MobileNavigation />
              </div>
            </div>
          </div>

          <div className="h-full flex-grow space-x-3 flex items-center justify-center">
            <div
              style={{
                background:
                  "linear-gradient(296.93deg, #FFE600 13.61%, #FFF7AD 110.94%)",
              }}
              className="w-[22px] lg:w-11 lg:h-11 h-[22px] rounded-full"
            ></div>
            <p className="lg:text-5xl text-2xl">5th</p>
          </div>
        </div>
      </div>

      <section>
        <Rankings />
      </section>
    </div>
  );
}
