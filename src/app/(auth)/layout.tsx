import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
      <main className="font-xeroda">
        <div className="flex">
          <div className="flex-1 px-10 lg:px-20">
            <Wrapper>
              <div className="py-14 w-[110px] md:w-auto">
                {/* <Image
                  alt="Logo"
                  src="/assets/logo.svg"
                  width={223}
                  height={60}
                /> */}
                <h1 className="text-3xl md:text-5xl font-bold text-white">Socrates Nigeria</h1>
              </div>
              {children}
            </Wrapper>
          </div>
          <div className="min-h-screen hidden bg-[#0057FF] lg:flex items-center justify-center w-1/3">
            <Image
              alt="Ovals"
              src="/assets/ovals.svg"
              width={238}
              height={138}
            />
          </div>
        </div>
      </main>
    // </Suspense>
  );
}
