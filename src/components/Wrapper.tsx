import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1100px] relative mx-auto">{children}</div>;
}
