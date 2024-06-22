import { routes } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineLeaderboard, MdOutlineTask } from "react-icons/md";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <AiOutlineMenu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <div className="bg-[#1B1E24] h-full w-full">
          <div className="py-12 w-[110px] md:w-auto">
            <Image alt="Logo" src="/assets/ovals.svg" width={58} height={34} />
          </div>
          <ul>
            {routes.map((route, index) => {
              return (
                <Link href={route.link} key={index}>
                  <li className={`py-4 flex items-center space-x-3`}>
                    {route.icon === "AiOutlineHome" ? (
                      <AiOutlineHome className="w-6 h-6" />
                    ) : route.icon === "MdOutlineLeaderboard" ? (
                      <MdOutlineLeaderboard className="w-6 h-6" />
                    ) : (
                      <MdOutlineTask className="w-6 h-6" />
                    )}
                    <span>{route.name}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
