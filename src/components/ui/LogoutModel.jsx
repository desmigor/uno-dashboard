import React, { useContext, useState } from "react";
import Logout from "../../assets/images/dashboard/icon/logout.svg";
import ArrowRight from "../../assets/images/dashboard/icon/arrow-right.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import PlaceHolderImage from "../../assets/images/dashboard/image/image.png";
import { Dialog } from "@headlessui/react";

const LogoutModel = ({ onClose }) => {
  const { type, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Dialog open={true} onClose={onClose}>
      <div className="w-[275px] px-3 py-[14px] h-[120px] absolute z-10 top-[54px] rounded-lg right-[28px] bg-white shadow-xl flex flex-col">
        <div
          className="w-[189px] h-[38px] justify-start items-center gap-3 inline-flex cursor-pointer"
          onClick={() => {
            userInfo?.type?.id === 3
              ? navigate("/admin/dashboard/settings")
              : navigate("/support/dashboard/settings");
              onClose();
          }}
        >
          <img
            className="w-8 h-8 rounded-full object-cover bg-red-50"
            src={
              userInfo?.profile_photo_link
                ? userInfo?.profile_photo_link
                : PlaceHolderImage
            }
          />
          <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-black text-sm font-normal font-rubik leading-tight">
              {userInfo?.full_name.slice(0, 1).toUpperCase() +
                userInfo?.full_name.slice(1)}
            </div>
            <div className="text-gray-400 text-xs font-normal font-rubik leading-none">
              {userInfo?.email}
            </div>
          </div>
        </div>
        <div className="w-[251px] h-[0px] border border-gray-100 mt-3 mb-2" />
        <div
          onClick={() => {
            dispatch(logout());
            type === "admin" && navigate("/admin");
            type === "support" && navigate("/support");
          }}
          className="flex flex-row items-center justify-between cursor-pointer h-9 rounded-md hover:bg-neutral-100"
        >
          <div className="flex flex-row gap-3 items-center ">
            <div className="flex items-center justify-center w-7 h-7 bg-neutral-100 rounded-full">
              <img src={Logout} className="h-3.5 w-3.5 ml-[4px]" />
            </div>
            <div className="text-zinc-800 text-sm font-normal font-rubik leading-tight">
              Log Out
            </div>
          </div>
          <img src={ArrowRight} className="h-5 w-5 ml-[4px]" />
        </div>
      </div>
    </Dialog>
  );
};

export default LogoutModel;
