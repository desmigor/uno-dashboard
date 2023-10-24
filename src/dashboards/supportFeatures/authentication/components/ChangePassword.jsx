import React, { useState } from "react";
import Logo from "../../../../assets/images/authentication/Logo.png";
import AuthenticationLeftSection from "./AuthenticationLeftSection";
import tick from "../../../../assets/images/authentication/tick-circle.png";
import { Link } from "react-router-dom";

import PasswordV from "../../../../components/ui/PasswordVisible.jsx";
import PasswordH from "../../../../components/ui/PasswordHidden.jsx";

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add your password change logic and, if successful, set isSuccessModalVisible to true.
    // For this example, I'm simulating success after a short delay.
    setIsSuccessModalVisible(true);
  };

  return (
    <div className="bg-blue h-[100vh] p-8 rounded-md shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[100%] place-content-center">
        {/* Left Column */}
        <AuthenticationLeftSection title="Welcome to UNO Support System to help our customers." subtitle=" Effortlessly manage deliveries and couriers with our secure
              support system and help clients resolve issues with their
              packages." image='bgimage' />

        {/* Right Column */}
        <div className="bg-white rounded-md items-center text-center ">
          <img src={Logo} alt="Logo" className="h-16 mx-auto mt-10 mb-20" />
          <div className="text-zinc-800 text-4xl font-bold font-rubik mb-4">
            Change Password
          </div>
          <p className="mb-4 text-[#6F8190]">
            Please change your password to something that you can remember.
          </p>
          {/* Input Fields */}
          <form onSubmit={handleSubmit} className="grid place-content-center ">
            <div className="w-[372px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex my-5">
              <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                Password
              </div>
              <div className="relative w-full">
                <input
                  type={showPassword1 ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-between items-center inline-flex "
                  placeholder="Your password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility1}
                >
                  {showPassword1 ? <PasswordH /> : <PasswordV />}
                </button>
              </div>
            </div>

            <div className="w-[372px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
                New Password
              </div>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="w-full h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-between items-center "
                  placeholder="Your new password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <PasswordH /> : <PasswordV />}
                </button>
              </div>
            </div>
            {/* Sign In Button */}
            <button
              type="submit"
              className="w-[372px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 inline-flex my-10"
            >
              <div className="text-center text-white text-base font-normal font-rubik leading-tight">
                Change Password
              </div>
            </button>
          </form>
          {/* Footer */}
          <div className="w-[373px] h-4 justify-start items-center gap-6 inline-flex mt-[180px]">
            <div className="text-gray-400 text-xs font-normal font-rubik leading-none">
              ©2023 All Rights Reserved.
            </div>
            <div className="text-red-800 text-xs font-normal font-rubik leading-none">
              Terms Of Service
            </div>
            <div className="text-red-800 text-xs font-normal font-rubik leading-none">
              Privacy Policy
            </div>
          </div>
        </div>
      </div>
      {isSuccessModalVisible && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-60">
          <div className="bg-white p-4 rounded-md shadow-lg text-end">
            <button
              type="button"
              class="w-6 h-6 relative justify-center items-center inline-flex "
              data-modal-hide="staticModal"
              onClick={() => setIsSuccessModalVisible(false)}
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class=" text-center">
              <div class="text-zinc-800 text-2xl font-bold font-rubik text-center">
                Password Changed
              </div>

              <div class="w-[102px] h-[102px]  inline-flex my-4 content-center	">
                <div class="w-[102px] h-[102px]">
                  <img src={tick} alt="" className="" />
                </div>
              </div>
              <div class="w-[348px] h-[66px] text-center">
                <span className="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  Your password has been{" "}
                </span>
                <span class="text-zinc-800 text-base font-semibold font-rubik leading-tight">
                  successfully
                </span>
                <span className="text-zinc-800 text-base font-normal font-rubik leading-tight">
                  {" "}
                  changed. Use your new password and log in to your workspace.
                </span>
              </div>

              <Link
                to={'/'}
                className="w-[348px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 inline-flex mt-6"
                onClick={() => setIsSuccessModalVisible(false)}
              >
                <div class="text-center text-white text-base font-normal font-rubik leading-tight">
                  Go to Sign In
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
