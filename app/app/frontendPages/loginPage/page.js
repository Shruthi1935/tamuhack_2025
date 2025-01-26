import React from "react";
import Link from 'next/link';
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";


const Login = () => {
  return (
    <section className="bg-gradient-to-b from-[#e6d7ff] via-[#d4bbff] to-[#b88eff] min-h-screen">
        <div className="flex flex-row">
            <div className="flex flex-col p-32 w-1/2"> {/* Set width to 50% */}
                <div className="font-chillax font-medium text-[#311460] text-7xl drop-shadow-4xl pb-10"> Login </div>
                <div className="flex flex-col p-8 bg-purple-200 rounded-xl space-y-4"> {/* Added space-y-4 for spacing between inputs */}
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="py-2 bg-transparent border-b-2 border-[#311460]" 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="py-2 bg-transparent border-b-2 border-[#311460]" 
                    />
                </div>

                <button type="submit" className="p-2 font-chillax bg-[#311460] text-purple-200 rounded-full w-[38%] mt-8 text-base font-bold transform transition-transform duration-300 hover:scale-105">
                    Lets Go!
                </button>

                <div className="font-chillax font-medium text-[#311460] pt-8"> 
                    Don't have an account? 
                    <br/>
                    <Link href="/frontendPages/signupPage" className="underline hover:-translate-y-4 transition-transform duration-300"> 
                        Sign-up Here
                    </Link> 
                </div>
            </div>

            <div className="flex-[1] flex flex-col w-1/2"> {/* Set width to 50% */}
                <BackgroundGradientAnimation />
            </div>
        </div>
    </section>
  );
}

export default Login;
