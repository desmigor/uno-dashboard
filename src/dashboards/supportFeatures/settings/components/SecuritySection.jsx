import React, { useState } from "react";
import PasswordV from "../../../../components/ui/PasswordVisible.jsx";
import PasswordH from "../../../../components/ui/PasswordHidden.jsx";
import callAPI from "../../../../utils/api.js";
import SuccessToast from "../../../../components/ui/SuccessToast.jsx";

export default function SecuritySection() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastSuccess, setToastSuccess] = useState(true);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  const handleSubmit = async (e) => {
    try {
      const data = {
        old_password: currentPassword,
        password: newPassword,
        password_confirm: confirmPassword,
      };
      const response = await callAPI(
        "/api/auth/web/change-password/",
        "PUT",
        true,
        data
      );
      setToastText("Password changed successfully");
      setToastSuccess(true);
      setShowToast(true);
    } catch (err) {
      console.log(err);
      setToastText(err.response.data.message);
      setToastSuccess(false);
      setShowToast(true);
    }
  };

  return (
    <div className="w-[100%] h-[100%] p-5 bg-white rounded-lg flex-col justify-center items-start gap-[30px] inline-flex">
      <SuccessToast
        text={toastText}
        show={showToast}
        onClose={() => setShowToast(false)}
        success={toastSuccess}
      />
      <form
        className="self-stretch h-[333px] flex-col justify-start items-start gap-5 flex"
        utocomplete="off"
      >
        <div className="flex-col justify-start items-start gap-2.5 flex">
          <div className="text-gray-900 text-lg font-semibold font-rubik">
            Password
          </div>
          <div className="text-slate-500 text-base font-normal font-rubik leading-tight">
            Please change your password to something that you can remember.
          </div>
        </div>
        <div className="h-[74px] flex-col justify-start items-start gap-1.5 flex">
          <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
            Current password
          </div>
          <div className="relative justify-start">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              // avoid auto-fill
              autocomplete="new-password"
              onChange={handleCurrentPasswordChange}
              className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-between items-center inline-flex w-[371px]"
              placeholder="Your password"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={toggleCurrentPasswordVisibility}
            >
              {showCurrentPassword ? <PasswordH /> : <PasswordV />}
            </button>
          </div>
        </div>
        <div className="h-[74px] flex-col justify-start items-start gap-1.5 flex">
          <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
            New password
          </div>
          <div className="relative justify-start">
            <input
              type={showNewPassword ? "text" : "password"}
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
              onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? <PasswordH /> : <PasswordV />}
            </button>
          </div>
        </div>
        <div className="h-[74px] flex-col justify-start items-start gap-1.5 flex">
          <div className="text-slate-500 text-sm font-normal font-rubik leading-tight">
            Confirm password
          </div>
          <div className="relative justify-start">
            <input
              type={showConfirmPassword ? "text" : "password"}
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
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <PasswordH /> : <PasswordV />}
            </button>
          </div>
        </div>
      </form>
      <button
        disabled={!(currentPassword && newPassword && confirmPassword)}
        className={`w-[199px] h-[50px] px-[60px] py-[15px] rounded-xl justify-center items-center gap-2.5 inline-flex cursor-pointer
      ${
        currentPassword && newPassword && confirmPassword
          ? "bg-red-800 text-white"
          : "bg-zinc-300 text-gray-400"
      }
      
      `}
        onClick={handleSubmit}
      >
        <div className="text-center text-base font-normal font-rubik leading-tight">
          Save
        </div>
      </button>
    </div>
  );
}
