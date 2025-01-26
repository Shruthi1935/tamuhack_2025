import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Home() {
  return (
    <BackgroundGradientAnimation>
      
      <Image
        src="/elephant.png"
        alt="Ellie the elephant logo"
        className="m-4"
        width={64}
        height={64}
      />

      <div className="absolute z-50 inset-0 flex items-center justify-center text-center px-4">
        <div className="flex flex-col space-y-10 text-center items-center">
          <div className="font-chillax font-medium text-[#E8DBFF] text-7xl drop-shadow-4xl"> Your Student Companion </div>
          <div className="font-chillax font-medium text-[#E8DBFF]"> Your ultimate companion to get instant answers to all your university-related questions — sign up today! <br/> Get 24/7 support for your academic and campus life needs. </div>

          <div className="flex flex-row space-x-6">
            <Link href="/frontendPages/loginPage" className="font-chillax font-medium text-[#E8DBFF] border border-[#E8DBFF] rounded-full px-6 py-2 cursor-pointer hover:-translate-y-3 duration-300 shadow-4xl shadow-[#17125D]"> Login </Link>
            <Link href="/frontendPages/signupPage" className="font-chillax font-medium text-[#2C174B] bg-[#E8DBFF] rounded-full px-6 py-2 cursor-pointer hover:-translate-y-3 duration-300 shadow-4xl shadow-[#17125D]"> Sign-up </Link>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
