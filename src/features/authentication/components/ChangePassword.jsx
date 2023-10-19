import React from "react";
import Logo from "../../../assets/images/authentication/Logo.png";
import AuthenticationLeftSection from "./AuthenticationLeftSection";

function ChangePassword() {
  return (
    <div className="bg-blue p-8 rounded-md shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-content-center">
        {/* Left Column */}
        <AuthenticationLeftSection />

        {/* Right Column */}
        <div className="bg-white rounded-md p-8 items-center text-center ">
          <img src={Logo} alt="Logo" className="h-16 mx-auto mt-10 mb-20" />
            <div class="text-zinc-800 text-4xl font-bold font-['Rubik'] mb-4">
              Change Password
            </div>
            <p className="mb-4 text-[#6F8190]">
              Please change your password to something that you can remember.
            </p>
          {/* Input Fields */}
          <form className="grid place-content-center ">
          <div class="w-[372px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex my-5">
              <div class="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
                Password
              </div>
              {/* <div class="justify-center items-center gap-2.5 flex"> */}
              <input
                type="password"
                id="password"
                name="password"
                className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-between items-center inline-flex "
                placeholder="Your password"
              />
              
            </div>

            <div class="w-[372px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
              <div class="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
                Password
              </div>
              {/* <div class="justify-center items-center gap-2.5 flex"> */}
              <input
                type="password"
                id="password"
                name="password"
                className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-between items-center inline-flex "
                placeholder="Your password"
              />
            </div>
            <div class="text-red-800 text-xs font-normal font-['Rubik'] leading-noned ml-60">
              Forgot Password?
            </div>
            {/* Sign In Button */}
            <button
              type="submit"
              className="w-[372px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 inline-flex my-10"
            >
              <div class="text-center text-white text-base font-normal font-['Rubik'] leading-tight">
                Sign In
              </div>
            </button>
          </form>
          {/* Footer */}
          <div class="w-[373px] h-4 justify-start items-center gap-6 inline-flex mt-[180px]">
            <div class="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
              ©2023 All Rights Reserved.
            </div>
            <div class="text-red-800 text-xs font-normal font-['Rubik'] leading-none">
              Terms Of Service
            </div>
            <div class="text-red-800 text-xs font-normal font-['Rubik'] leading-none">
              Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
