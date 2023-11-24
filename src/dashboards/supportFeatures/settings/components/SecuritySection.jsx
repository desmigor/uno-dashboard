import React, { useState } from "react";
import PasswordV from "../../../../components/ui/PasswordVisible.jsx";
import PasswordH from "../../../../components/ui/PasswordHidden.jsx";

export default function SecuritySection() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div class="w-[100%] h-[100%] p-5 bg-white rounded-lg flex-col justify-center items-start gap-[30px] inline-flex">
      <div class="self-stretch h-[333px] flex-col justify-start items-start gap-5 flex">
        <div class="flex-col justify-start items-start gap-2.5 flex">
          <div class="text-gray-900 text-lg font-semibold font-rubik">
            Password
          </div>
          <div class="text-slate-500 text-base font-normal font-rubik leading-tight">
            Please change your password to something that you can remember.
          </div>
        </div>
        <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
          <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
            Current password
          </div>
          <div className="relative justify-start">
            <input
              type={showPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-between items-center inline-flex w-[371px]"
              placeholder="Your password"
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
        <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
          <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
            New password
          </div>
          <div className="relative justify-start">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-between items-center inline-flex w-[371px]"
              placeholder="Your password"
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
        <div class="h-[74px] flex-col justify-start items-start gap-1.5 flex">
          <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
            Confirm password
          </div>
          <div className="relative justify-start">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-between items-center inline-flex w-[371px]"
              placeholder="Your password"
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
      </div>
      <div class="w-[199px] h-[50px] px-[60px] py-[15px] bg-zinc-200 rounded-xl justify-center items-center gap-2.5 inline-flex">
        <div class="text-center text-gray-400 text-base font-normal font-rubik leading-tight">
          Save
        </div>
      </div>
    </div>
  );
}
