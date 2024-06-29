"use client";
import Rankings from "@/components/leaderboard/Rankings";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Router } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Leaderboard() {
  const { userPosition, token, setToken } = useGlobalState();
  const router = useRouter();

  // function getOrdinalSuffix(number: number) {
  //   const lastDigit = parseInt(number.toString().slice(-1));
  //   switch (lastDigit) {
  //     case 1:
  //       return "st";
  //     case 2:
  //       return "nd";
  //     case 3:
  //       return "rd";
  //     default:
  //       return "th";
  //   }
  // }

  useEffect(() => {
    if (token === null) {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        router.push("/sign-up");
      }
    }
  }, [router, setToken, token]);


  // const formattedPosition = `${userPosition}${getOrdinalSuffix(userPosition)}`;

  return (
    <div className="font-xeroda">
      <div
        style={{
          background: "linear-gradient(93.77deg, #0057FF 0%, #16A0FF 95.76%)",
        }}
        className="h-[340px] w-full lg:px-16 px-4 pt-9 lg:pt-10"
      >
        <div className="flex h-full flex-col items-stretch">
          <div className="flex items-center justify-between">
            {/* <FaArrowLeft className="lg:w-11 lg:h-11 w-[22px] h-[22px]" /> */}
            <div className=""></div>
            <p className="lg:text-4xl text-xl">Leaderboard</p>
            <div className="">
              <div className="lg:hidden">
                <MobileNavigation />
              </div>
            </div>
          </div>

          <div className="h-full flex-grow space-x-3 flex items-center justify-center">
            {/* <div
              style={{
                background:
                  "linear-gradient(296.93deg, #FFE600 13.61%, #FFF7AD 110.94%)",
              }}
              className="w-[22px] lg:w-11 lg:h-11 h-[22px] rounded-full"
            ></div> */}

            <p className="lg:text-5xl text-2xl">Position:</p>
            <p className="lg:text-5xl text-2xl">{userPosition}</p>
          </div>
        </div>
      </div>

      <section>
        <Rankings />
      </section>
    </div>
  );
}
