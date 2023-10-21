import React from 'react'

import instagram from "../../../../assets/images/authentication/Instagram.png";
import telegram from "../../../../assets/images/authentication/Telegram.png";
import reddit from "../../../../assets/images/authentication/Reddit.png";
import discord from "../../../../assets/images/authentication/Discord.png";
import youtube from "../../../../assets/images/authentication/YouTube.png";
import leftQuote from "../../../../assets/images/authentication/left-quote.png";
import rightQuote from "../../../../assets/images/authentication/right-quote.png";

function AuthenticationLeftSection({title, subtitle, image}) {
    return (
        <div className={image + " rounded-xl p-8 flex flex-col pr-3.5 place-content-center"}>
          {/* add space above here to center  */}
          <div className="h-40">
            </div>
          <div class="w-[123px] h-[123px] relative">
            <div class="w-[123px] h-[108.46px] left-0 top-[7.27px] absolute"></div>
            <img src={leftQuote} />
          </div>
          <div className="">
            <div class="w-[90%] text-white text-4xl font-bold font-rubik mt-[50px] mb-[20px] ">
              {title}
              {/* Welcome to UNO Support System
              <br />
              to help our customers. */}
            </div>
            <div class="w-[80%] text-white text-base font-normal font-rubik leading-tight">
              {/* Effortlessly manage deliveries and couriers with our secure
              support system and help clients resolve issues with their
              packages. */}
              {subtitle}
            </div>
          </div>
          <div class="w-[123px] h-[123px] relative origin-top-left rotate-360 ml-[450px] mt-[50px]">
            <div class="w-[123px] h-[108.46px] left-0 top-[7.27px] absolute"></div>
            <img src={rightQuote} alt="" className="" />
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-8 mt-4 mt-[80px] place-content-center">
            {/* Replace the following with your actual social media icons */}
            <div class="w-10 h-10 relative bg-opacity-20 rounded-[100px]">
              <img class="top-[10px] absolute hover:bg-slate-400 rounded-[100px]" src={instagram} />
            </div>
            <div class="w-10 h-10 relative bg-opacity-20 rounded-[100px]">
              <img class="top-[10px] absolute hover:bg-slate-400 rounded-[100px]" src={youtube} />
            </div>
            <div class="w-10 h-10 relative bg-opacity-20 rounded-[100px]">
              <img class="top-[10px] absolute hover:bg-slate-400 rounded-[100px]" src={telegram} />
            </div>
            <div class="w-10 h-10 relative bg-opacity-20 rounded-[100px]">
              <img class="top-[10px] absolute hover:bg-slate-400 rounded-[100px]" src={discord} />
            </div>
            <div class="w-10 h-10 relative bg-opacity-20 rounded-[100px]">
              <img class="top-[10px] absolute hover:bg-slate-400 rounded-[100px]" src={reddit} />
            </div>
          </div>
        </div>
    );
    }

export default AuthenticationLeftSection