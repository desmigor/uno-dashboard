import React, { useContext, useState } from "react";
import Logo from "../../../../assets/images/authentication/Logo.png";
import PasswordV from "../../../../components/ui/PasswordVisible.jsx";
import PasswordH from "../../../../components/ui/PasswordHidden.jsx";
import AuthenticationLeftSection from "./AuthenticationLeftSection";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../../../context";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginAction } from "../../../../redux/actions/authAction";

function Login() {
  const { loading, error, isPassword } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = () => {
    dispatch(handleLoginAction(username, password, 'support', navigate));
  }

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
        <div className="bg-white rounded-md p-8 items-center text-center h-[100%]">
          <img src={Logo} alt="Logo" className="h-16 mx-auto mt-[1vh] mb-[4vh]" />
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Sign in</h2>
            <p className="mb-4 text-[#6F8190]">
              Log in to your account with credentials from Admin
            </p>
          </div>
          {/* Input Fields */}
          <div className="grid place-content-center ">
            <div class="w-[372px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
              <div class="text-slate-500 text-sm font-normal font-rubik leading-tight">
                Email
              </div>
              <input
                type="email"
                value={username}
                onChange={handleUsernameChange}
                id="email"
                name="email"
                className="self-stretch h-12 px-4 py-[13px] rounded-xl border border-zinc-200 justify-start items-center gap-2.5 inline-flex"
                placeholder="Your email"
              />
              {!isPassword && <div className="text-red-700 text-xs font-normal font-rubik leading-none">{error}</div> }
            </div>

            <div class={`w-[372px] ${!isPassword ? error?.length === 0 ? 'mt-0' : 'mt-3' : 'mt-0'} h-[74px] flex-col justify-start items-start gap-1.5 inline-flex`}>
              <div class="text-slate-500 text-sm font-normal font-rubik leading-tight mt-4">
                Password
              </div>
              <div className="relative justify-start">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
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
              {isPassword && <div className="text-red-700 text-xs font-normal font-rubik leading-none">{error}</div> }
            </div>
            <Link to={"/reset"}>
              <div class="text-red-800 text-xs font-normal font-rubik leading-noned ml-60">
                Forgot Password?
              </div>
            </Link>
            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-[372px] h-[50px] px-[60px] py-[15px] bg-red-800 rounded-xl justify-center items-center gap-2.5 inline-flex my-10"
            >
              <div class="text-center text-white text-base font-normal font-rubik leading-tight">
                Sign In
              </div>
            </button>
          </div>
          {/* Footer */}
          <div class="w-[373px] h-4 justify-start items-center gap-6 inline-flex mt-[20vh]">
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

export default Login;
