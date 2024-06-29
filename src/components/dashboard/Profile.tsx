"use client";

import { useGlobalState } from "@/context/GlobalStateContext";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";

export default function Profile() {
  const {
    userName,
    userEmail,
    token,
    setUserName,
    setUserEmail,
    setUserReferralCode,
    setUserReferrerCode,
  } = useGlobalState();
  const router = useRouter();

  async function logOut() {
    const response = await fetch(
      "https://backend.decodingthefuture.xyz/api/v1/auth/logout",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    toast.success(`${data.data}`);

    sessionStorage.clear();

    router.push("/sign-up");
    setUserName("");
    setUserEmail("");
    setUserReferralCode("");
    setUserReferrerCode("");
  }

  function getNameInitials(name: string) {
    const nameParts = name.split(' ');
  
    const initials = nameParts.map(part => part[0].toUpperCase());

    return initials.join('');
  }

  return (
    <div className="lg:px-20 px-3 py-12 font-xeroda">
      <div className="flex mb-20 items-center space-x-3 lg:space-x-9">
        {userName ? (
          <>
            <div className="lg:w-[146px] lg:h-[146px] flex items-center justify-center w-[74px] h-[74px] rounded-full bg-[#60D8F4] border border-[#2B54B8]">
              <p className="text-xl lg:text-4xl">{getNameInitials(userName)}</p>
            </div>
            <div className="">
              <p className="text-2xl lg:text-5xl">
                {userName ? `${userName}` : "NaN"}
              </p>
              <p className="text-[#666666] text-base lg:text-3xl">
                {userEmail ? `${userEmail}` : "NaN"}
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-3 lg:space-x-9">
            <Skeleton className="lg:w-[146px] lg:h-[146px] w-[74px] h-[74px] rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 lg:h-12 w-[250px]" />
              <Skeleton className="h-6 lg:h-12 w-[200px]" />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => logOut()}
        className="bg-[#1B1E24] w-full text-[#CC3030] text-left rounded-[10px] py-8 flex items-center space-x-2 px-11"
      >
        <MdOutlineLogout className="h-6 w-6" />

        <p className="text-[28px]">Log Out</p>
      </button>
    </div>
  );
}
