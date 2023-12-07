import callAPI from "../../utils/api";
import { fetchNotifications, fetchNotificationsSuccess } from "../slices/notificationsSlice";

export const fetchNotificationsAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/notification/user-notifications/",
      "GET",
      true
    );
    dispatch(fetchNotifications());
    dispatch(fetchNotificationsSuccess(result));
    return result.data;
  } catch (error) {
  }
};

export const deleteNotificationAction = (id) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/notification/user-notifications/" + id,
      "DELETE",
      true
    );
    dispatch(fetchNotificationsAction());
  } catch (error) {
  }
}

export const UpdateReadNotificationAction = (id) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/notification/user-notifications/" + id,
      "PUT",
      true
    );
    dispatch(fetchNotificationsAction());
  } catch (error) {
  }
}

export const DeleteAllNotificationAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/notification/user-notifications/",
      "DELETE",
      true
    );
    dispatch(fetchNotificationsAction());
  } catch (error) {
  }
}