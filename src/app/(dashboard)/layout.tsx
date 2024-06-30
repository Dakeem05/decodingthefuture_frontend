"use client";

import Wrapper from "@/components/Wrapper";
import { routes } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineLeaderboard, MdOutlineTask } from "react-icons/md";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

  }, [setToken]);

  const matchPath = (path: string) => {
    return path === pathname;
  };


  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex relative">
        <div className={`${token && "lg:block"}  w-1/4 hidden  bg-[#0F1114] lg:fixed px-4 2xl:relative min-h-screen border-[#4E4E4E] border-r`}>
          <div className="py-12 w-[110px] md:w-auto">
            <Image alt="Logo" src="/assets/ovals.svg" width={58} height={34} />
          </div>
          <ul>
            {routes.map((route, index) => {
              return (
                <Link href={route.link} key={index}>
                  <li
                    className={`${
                      matchPath(route.link) && "bg-[#0057FF] rounded-[10px]"
                    } px-6 py-4 flex items-center space-x-3`}
                  >
                    {route.icon === "AiOutlineHome" ? (
                      <AiOutlineHome className="w-6 h-6" />
                    ) : route.icon === "MdOutlineLeaderboard" ? (
                      <MdOutlineLeaderboard className="w-6 h-6" />
                    ) : (
                      <MdOutlineTask className="w-6 h-6"  />
                    )}
                    <span>{route.name}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="w-full lg:pl-[250px] xl:pl-[310px] 2xl:pl-0">
          {children}
        </div>
      </div>
    </div>
  );
}
