import Box from "../../assets/images/dashboard/icon/box-icon-notification.svg";
import closeIcon from "../../assets/images/dashboard/icon/close-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotificationAction } from "../../redux/actions/fetchNotifications";

function NotificationCard({ notification }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteNotificationAction(id));
  };

  // 2023-12-06T13:01:33.397385Z converted as now, 1 hour ago, 2 days ago, etc.
  const now = new Date();
  const date = new Date(notification.updated_at);
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  let time = "";
  if (minutes < 1) {
    time = `${seconds}s ago`;
  }
  if (hours < 1) {
    time = `${minutes}min ago`;
  } else if (hours < 24) {
    time = `${hours}h ago`;
  } else {
    const days = Math.floor(hours / 24);
    time = `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return (
      <div
        className={`w-full flex flex-row items-start justify-between p-3 border-b border-gray-00 hover:bg-gray-200 cursor-pointer ${
          notification.read ? "" : "bg-gray-100"
        }`}
      >
        <div className="flex flex-row items-start gap-2 w-[250px]">
          <div className="w-6 h-6 p-1 bg-gray-100 rounded-[100px] justify-center items-center flex flex-row">
            <img src={Box} className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="text-zinc-900 text-sm font-normal font-rubik leading-none">
              {notification.title}
            </div>
            <div className="text-gray-500 text-xs font-normal font-rubik leading-none mt-1">
              {notification.body}
            </div>
          </div>
        </div>
        <div className="items-end justify-end flex flex-col">
          <div className="flex flex-row gap-2 items-center mt-1 text-gray-400">
            {time}
          </div>
          <button
            className="flex flex-row gap-2 items-center mt-1 cursor-pointer"
            onClick={() => {
              handleDelete(notification.id);
            }}
          >
            <img src={closeIcon} className="w-4 h-4 ml-8" />
          </button>
        </div>
      </div>
  );
}

export default NotificationCard;
