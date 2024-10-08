import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "../../assets/images/dashboard/icon/search-normal.svg";
import Notification from "../../assets/images/dashboard/icon/notification.svg";
import Notification2 from "../../assets/images/dashboard/icon/notification2.svg";
import Logo from "../../assets/images/dashboard/icon/Logo-white.svg";
import NotificationModal from "./NotificationModal";
import LogoutModel from "./LogoutModel";
import PlaceHolderImage from "../../assets/images/dashboard/image/image.png";
import ArrowLeft2 from "../../assets/images/dashboard/icon/arrow-left-thin-red.svg";
import { Link, useNavigate } from "react-router-dom";
import { fetchNotificationsAction } from "../../redux/actions/fetchNotifications";
import { fetchPendingAction } from "../../redux/actions/fetchPendingAction";

function Navbar({ map }) {
  const [notification, setNotification] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [unreadNotifications, setUnreadNotifications] = useState();
  const navigate = useNavigate();

  const { notifications } = useSelector((state) => state.notifications);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotificationsAction()).then((res) => {
      getUnreadNotifications(res);
    });
  }, []);

  const getUnreadNotifications = (notif) => {
    setUnreadNotifications(notif?.filter((notification) => !notification.read));
  };

  return (
    <div className="w-full h-[62px] px-10 py-3 bg-white border-b border-gray-100 items-center flex justify-between relative">
      {!map && (
        <div className="2xl:w-[460px] w-[60%] flex flex-row">
          <input
            className="w-full h-[38px] px-4 py-[13px] rounded-tl-[10px] rounded-bl-[10px] border border-zinc-200 justify-start items-center gap-2.5 inline-flex placeholder:text-gray-300 text-sm font-normal font-rubik leading-tight"
            placeholder="Search tracking number"
            type="text"
            onFocus={(e) =>
              userInfo?.type?.id === 3
                ? navigate("/admin/dashboard/pending")
                : navigate("/support/dashboard/pending")
            }
            onChange={(e) => {
              dispatch(fetchPendingAction(e.target.value));
            }}
          />
          <button className="w-[38px] h-[38px] p-[11px] bg-red-800 rounded-tr-[10px] rounded-br-[10px] justify-center items-center inline-flex">
            <img src={SearchIcon} alt="ICONSVG" className="w-[16px] h-[16px]" />
          </button>
        </div>
      )}
      {map && (
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer flex flex-row gap-1.5 items-center my-auto justify-center"
        >
          <img src={ArrowLeft2} className="rotate-180 w-6 h-6" />
          <div className="text-red-800 text-base font-normal font-rubik leading-tight">
            Back
          </div>
        </div>
      )}
      {map && <img className="w-10 h-10" src={Logo} />}
      <div className="w-24 h-9 justify-start items-start gap-6 inline-flex">
        <div
          onClick={() => {
            setNotification(!notification);
            setLogoutModal(false);
          }}
          className={`w-9 h-9 -100 rounded-full cursor-pointer flex items-center justify-center
              ${unreadNotifications?.length > 0 ? "bg-rose-100" : "bg-gray-100"}
            `}
        >
          <img
            src={unreadNotifications?.length > 0 ? Notification2 : Notification}
            alt="NOTIFICATIONSVG"
            className="w-5 h-5"
          />
        </div>
        <div
          onClick={() => {
            setLogoutModal(!logoutModal);
            setNotification(false);
          }}
          className="w-9 h-9 bg-gray-100 rounded-full cursor-pointer flex items-center justify-center"
        >
          <img
            src={
              userInfo?.profile_photo_link
                ? userInfo?.profile_photo_link
                : PlaceHolderImage
            }
            alt="NOTIFICATIONSVG"
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>
      </div>

      {notification && (
        <NotificationModal
          onCLose={() => {
            setNotification(false);
          }}
        />
      )}
      {logoutModal && (
        <LogoutModel
          onClose={() => {
            setLogoutModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Navbar;
