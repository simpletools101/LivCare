"use client";

import MessageContainer from "@/components/home/messageContainer/messageContainer";
import WelcomeUI from "@/components/home/welcome/welcome";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" h-full">
      <div className="h-full relative border border-transparent">
        <WelcomeUI />
        <div className=" absolute bottom-6 w-full flex items-center justify-center">
          <div className="w-[700px]">
            <MessageContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
