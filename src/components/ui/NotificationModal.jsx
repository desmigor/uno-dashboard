import React, { useEffect } from "react";
import Icon from "../../assets/images/dashboard/icon/close.svg";
import NotificationCard from "./NotificationCard";
import { fetchNotificationsAction, DeleteAllNotificationAction } from "../../redux/actions/fetchNotifications";
import { useDispatch, useSelector } from "react-redux";
import {Dialog} from "@headlessui/react";

function NotificationModal({ onCLose }) {
  const { notifications } = useSelector((state) => state.notifications);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotificationsAction());
  }, [dispatch]);

  return (
    <Dialog
      open={true}
    onClose={onCLose}
    >
      <div className="w-[367px] h-[440px] absolute z-10 top-[54px] rounded-lg right-[75px] bg-white shadow-lg flex flex-col overflow-auto">
        <div className="flex flex-row justify-between mt-5 mx-3">
          <span className="text-zinc-800 text-base font-semibold font-rubik leading-tight">
            Notifications ({notifications ? notifications.length : 0})
          </span>
          <div className="flex flex-row gap-[5px] items-center cursor-pointer"
          onClick = {
            () => {
              dispatch(DeleteAllNotificationAction());
            }
          }
          >
            <img src={Icon} className="w-[19px] h-[19px]" />
            <span className="text-red-800 text-xs font-normal font-rubik leading-none">
              Clear all
            </span>
          </div>
        </div>
        <div className="w-[337px] h-[0px] border border-gray-100 mt-[21px] overflow-scroll" />
        {notifications?.length > 0 &&
          notifications?.map((notification, index) => (
            <NotificationCard key={index} notification={notification} />
          ))}
      </div>
    </Dialog>
  );
}

export default NotificationModal;
