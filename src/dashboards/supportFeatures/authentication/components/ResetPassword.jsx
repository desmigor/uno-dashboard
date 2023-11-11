import React, { useState } from "react";
import AuthenticationLeftSection from "./AuthenticationLeftSection";
import Logo from "../../../../assets/images/authentication/Logo.png";
import { Link } from "react-router-dom";
import callAPI from "../../../../utils/api";
import SuccessToast from "../../../../components/ui/SuccessToast";

function ResetPassword() {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    try {
      const response = await callAPI(
        "/api/auth/forgot-password/resend/",
        "POST",
        null,
        data,
      );
      if (response.code === 200) {
        setError(null);
        setIsSuccessModalVisible(true);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="bg-blue h-[100vh] p-8 rounded-md shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[100%] place-content-center">
        {/* Left Column */}
        <AuthenticationLeftSection
          title="Welcome to UNO Support System to help our customers."
          subtitle=" Effortlessly manage deliveries and couriers with our secure
                support system and help clients resolve issues with their
                packages."
          image="bgimage"
        />

        {/* Right Column */}
        <div className="bg-white rounded-md  items-center text-center ">
          <SuccessToast
            text="Reset link sent successfully, check your email!"
            show={isSuccessModalVisible}
            onClose={() => setIsSuccessModalVisible(false)}
          />
          <img src={Logo} alt="Logo" className="h-16 mx-auto mt-12 mb-24" />
          <div className="grid place-content-center lg:px-[20%] xl:px-[28%]">
            <h2 className="text-2xl font-bold mb-4">Reset your Password</h2>
            <p className="mb-4 text-[#6F8190]">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>
          </div>
          {/* Input Fields */}
          <form className="grid place-content-center mt-8">
            <div class="w-[372px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
              <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
                Email
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                placeholder="Your email"
              />
            </div>
            {error != null && (
              <div className="text-red-700 text-xs font-normal font-rubik leading-none pt-2">
                {error}
              </div>
            )}

            <Link
              // to={'/change-password'}
              onClick={_handleSubmit}
              type="submit"
              className="w-[372px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 inline-flex my-10"
            >
              <div class="text-center text-white text-base font-normal font-rubik leading-tight">
                Send Reset Link
              </div>
            </Link>
            <Link
              to="/support"
              class="text-red-800 text-sm font-normal font-rubik leading-tight"
            >
              Return to Sign In
            </Link>
          </form>
          {/* Footer */}
          <div class="w-[373px] h-4 justify-start items-center gap-6 inline-flex mt-[220px]">
            <div class="text-gray-400 text-xs font-normal font-rubik leading-none">
              ©2023 All Rights Reserved.
            </div>
            <div class="text-red-800 text-xs font-normal font-rubik leading-none">
              Terms Of Service
            </div>
            <div class="text-red-800 text-xs font-normal font-rubik leading-none">
              Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
