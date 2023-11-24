import React from "react";
import EditIcon from "../../../../assets/images/dashboard/icon/edit-3.svg";
import EditIcon2 from "../../../../assets/images/dashboard/icon/edit-2.svg";
import noProfile from "../../../../assets/images/dashboard/image/image.png";

export default function ProfileSection() {
  return (
    <div className="w-[100%] h-[100%] p-5 bg-white rounded-lg flex-col justify-start items-start gap-6 inline-flex overflow-auto">
      <div className="justify-start items-center gap-5 inline-flex">
        <div className="w-[100px] h-[100px] relative">
          <div className="w-[100px] h-[100px] left-0 top-0 absolute">
            <div className="w-[100px] h-[100px] left-0 top-0 absolute rounded-full border-2 border-red-800"></div>
            <img
              className="w-[90px] h-[90px] left-[5px] top-[5px] absolute rounded-full"
              src={noProfile}
            />
          </div>
          <div className="h-8 pl-[10.15px] pr-[7.80px] py-[9.37px] left-[66px] top-[60px] absolute bg-red-800 rounded-[100px] justify-center items-center inline-flex">
            <div className="w-3.5 h-[13.27px] relative flex-col justify-start items-start flex">
              <img src={EditIcon} className="" />
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-3 inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 flex">
            <div className="text-gray-900 text-lg font-semibold font-['Rubik']">
              Michael James
            </div>
            <div className="text-gray-400 text-sm font-normal font-rubik leading-tight">
              michaeljames@gmail.com
            </div>
          </div>
          <div className="px-4 py-[3px] bg-rose-100 rounded-md justify-start items-start gap-2.5 inline-flex">
            <div className="text-red-800 text-sm font-normal font-['Lato'] leading-tight">
              Ghana Team
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 rounded-lg border border-gray-100 flex-col justify-start items-start gap-[3px] flex w-[100%]">
        <div className="justify-between items-start  inline-flex w-[100%]">
          <div className="text-gray-900 text-base font-semibold font-rubik leading-tight">
            Personal Information
          </div>
          <div className="w-[74px] h-[32px] px-[13px] bg-white rounded-[20px] border border-zinc-200 justify-center items-center gap-2 flex">
            <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-tight">
              Edit
            </div>
            <div className="w-3.5 h-3.5 justify-center items-center flex">
              <div className="w-3.5 h-3.5 relative">
                <img src={EditIcon2} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 w-[100%]">
          <div className="flex-col justify-start items-start gap-5 flex">
            <div class="h-[45px] flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                First Name
              </div>
              <div class="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                Michael
              </div>
            </div>
            <div class="h-[45px] flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                Email Address
              </div>
              <div class="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                michaeljames@gmail.com
              </div>
            </div>
            <div class="h-[45px] flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                Role
              </div>
              <div class="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                Support Team
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-5 flex">
            <div class="h-[45px] flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                Last Name
              </div>
              <div class="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                James
              </div>
            </div>
            <div class="h-[45px] flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                Phone Number
              </div>
              <div class="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                +233 245 678 900
              </div>
            </div>
            <div class="h-[45px] flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                Support Group
              </div>
              <div class="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                Ghana Team
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 rounded-lg border border-gray-100 flex-col justify-start items-start gap-[3px] flex w-[100%]">
        <div className="justify-between items-start inline-flex w-[100%]">
          <div className="text-gray-900 text-base font-semibold font-rubik leading-tight">
            Address
          </div>
          <div className="w-[74px] h-[32px] px-[13px] bg-white rounded-[20px] border border-zinc-200 justify-center items-center gap-2 flex">
            <div className="text-center text-zinc-800 text-sm font-normal font-rubik leading-tight">
              Edit
            </div>
            <div className="w-3.5 h-3.5 justify-center items-center flex">
              <div className="w-3.5 h-3.5 relative">
                <img src={EditIcon2} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 w-[100%]">
          <div className="flex-col justify-start items-start gap-5 flex">
            <div class="h-[45px] flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                Country
              </div>
              <div class="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                Ghana
              </div>
            </div>

            <div class="h-[45px] flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                Region
              </div>
              <div class="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                Asunafo North
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-5 flex">
            <div class="h-[45px] flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                City/State
              </div>
              <div class="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                Accra
              </div>
            </div>
            <div class="h-[45px] flex-col justify-start items-start gap-[5px] inline-flex">
              <div class="text-gray-400 text-sm font-normal font-['Rubik'] leading-tight">
                Postal Code
              </div>
              <div class="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                12345
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
