import React from "react";
import Logo from "../../../assets/images/authentication/Logo.png";
import LoginImage from "../../../assets/images/authentication/login_left.png";
import instagram from "../../../assets/images/authentication/Instagram.png";
import telegram from "../../../assets/images/authentication/Telegram.png";
import reddit from "../../../assets/images/authentication/Reddit.png";
import discord from "../../../assets/images/authentication/Discord.png";
import youtube from "../../../assets/images/authentication/YouTube.png";
import leftQuote from "../../../assets/images/authentication/left-quote.png";
import rightQuote from "../../../assets/images/authentication/right-quote.png";

function Login() {
  return (
    <div className="bg-blue p-8 rounded-md shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-screen">
        {/* Left Column */}
        <div className="bgimage rounded-xl p-8 flex flex-col">
          {/* add space above here to center  */}
          <div className="h-40">
            </div>
          <div class="w-[123px] h-[123px] relative">
            <div class="w-[123px] h-[108.46px] left-0 top-[7.27px] absolute"></div>
            <img src={leftQuote} />
          </div>
          <div className="text-center">
            <div class="w-[589px] text-white text-4xl font-bold font-['Rubik'] mt-[50px]">
              Welcome to UNO Support System
              <br />
              to help our customers.
            </div>
            <div class="w-[589px] text-white text-base font-normal font-['Rubik'] leading-tight">
              Effortlessly manage deliveries and couriers with our secure
              support system and help clients resolve issues with their
              packages.
            </div>
          </div>
          <div class="w-[123px] h-[123px] relative origin-top-left rotate-360 ml-[450px]">
            <div class="w-[123px] h-[108.46px] left-0 top-[7.27px] absolute"></div>
            <img src={rightQuote} alt="" className="" />
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-8 mt-4 mt-40">
            {/* Replace the following with your actual social media icons */}
            <div class="w-10 h-10 relative bg-opacity-20 rounded-[100px]">
              <img class="top-[10px] absolute" src={instagram} />
            </div>
            <div class="w-10 h-10 relative bg-opacity-20 rounded-[100px]">
              <img class="top-[10px] absolute" src={youtube} />
            </div>
            <div class="w-10 h-10 relative bg-opacity-20 rounded-[100px]">
              <img class="top-[10px] absolute" src={telegram} />
            </div>
            <div class="w-10 h-10 relative bg-opacity-20 rounded-[100px]">
              <img class="top-[10px] absolute" src={discord} />
            </div>
            <div class="w-10 h-10 relative bg-opacity-20 rounded-[100px]">
              <img class="top-[10px] absolute" src={reddit} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-md p-8 items-center text-center">
          <img src={Logo} alt="Logo" className="h-16 mx-auto mt-10 mb-20" />
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Sign in</h2>
            <p className="text-gray-700 mb-4">
              Log in to your account with credentials from Admin
            </p>
          </div>
          {/* Input Fields */}
          <form>
            <div class="w-[372px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
              <div class="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
                Email
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                placeholder="Your email"
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
          <div className="mt-8 text-gray-600 text-center">
            <p>©2023 All Rights Reserved.</p>
            <p>
              <a href="#">Terms Of Service</a> | <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
