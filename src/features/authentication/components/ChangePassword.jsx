import React, { useState } from "react";
import Logo from "../../../assets/images/authentication/Logo.png";
import AuthenticationLeftSection from "./AuthenticationLeftSection";
import tick from "../../../assets/images/authentication/tick-circle.png";

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
    setTimeout(() => {
      setIsSuccessModalVisible(true);
    }, 1000);
  };

  return (
    <div className="bg-blue p-8 rounded-md shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-content-center">
        {/* Left Column */}
        <AuthenticationLeftSection />

        {/* Right Column */}
        <div className="bg-white rounded-md p-8 items-center text-center ">
          <img src={Logo} alt="Logo" className="h-16 mx-auto mt-10 mb-20" />
          <div className="text-zinc-800 text-4xl font-bold font-['Rubik'] mb-4">
            Change Password
          </div>
          <p className="mb-4 text-[#6F8190]">
            Please change your password to something that you can remember.
          </p>
          {/* Input Fields */}
          <form onSubmit={handleSubmit} className="grid place-content-center ">
            <div className="w-[372px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex my-5">
              <div className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
                Password
              </div>
              <div className="relative">
                <input
                  type={showPassword1 ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-between items-center inline-flex "
                  placeholder="Your password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="w-[372px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="text-slate-500 text-sm font-normal font-['Rubik'] leading-tight">
                New Password
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-between items-center inline-flex "
                  placeholder="Your new password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="text-red-800 text-xs font-normal font-['Rubik'] leading-noned ml-60">
              Forgot Password?
            </div>
            {/* Sign In Button */}
            <button
              type="submit"
              className="w-[372px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 inline-flex my-10"
            >
              <div className="text-center text-white text-base font-normal font-['Rubik'] leading-tight">
                Sign In
              </div>
            </button>
          </form>
          {/* Footer */}
          <div className="w-[373px] h-4 justify-start items-center gap-6 inline-flex mt-[180px]">
            <div className="text-gray-400 text-xs font-normal font-['Rubik'] leading-none">
              ©2023 All Rights Reserved.
            </div>
            <div className="text-red-800 text-xs font-normal font-['Rubik'] leading-none">
              Terms Of Service
            </div>
            <div className="text-red-800 text-xs font-normal font-['Rubik'] leading-none">
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
              <div class="text-zinc-800 text-2xl font-bold font-['Rubik'] text-center">
                Password Changed
              </div>

              <div class="w-[102px] h-[102px]  inline-flex my-4 content-center	">
                <div class="w-[102px] h-[102px]">
                  <img src={tick} alt="" className="" />
                </div>
              </div>
              <div class="w-[348px] h-[66px] text-center">
                <span className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                  Your password has been{" "}
                </span>
                <span class="text-zinc-800 text-base font-semibold font-['Rubik'] leading-tight">
                  successfully
                </span>
                <span className="text-zinc-800 text-base font-normal font-['Rubik'] leading-tight">
                  {" "}
                  changed. Use your new password and log in to your workspace.
                </span>
              </div>

              <button
                className="w-[348px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 inline-flex mt-6"
                onClick={() => setIsSuccessModalVisible(false)}
              >
                <div class="text-center text-white text-base font-normal font-['Rubik'] leading-tight">
                  Go to Sign In
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
