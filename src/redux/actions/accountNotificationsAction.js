import callAPI from "../../utils/api";
import { fetchAccountNotificationsAction, fetchAccountNotificationsActionSuccess } from "../slices/accountNotificationsSlice";

export const fetchAccountNotificationsActionAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/notification/user-notification-setting/",
      "GET",
      true
    );
    dispatch(fetchAccountNotificationsAction());
    dispatch(fetchAccountNotificationsActionSuccess(result));
  } catch (error) {
  }
};

export const updateAccountNotificationsActionAction = (data) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/notification/user-notification-setting/",
      "Patch",
      true,
      data
    );
    console.log(data);
    console.log(result);
    dispatch(fetchAccountNotificationsAction());
    dispatch(fetchAccountNotificationsActionSuccess(result));
  } catch (error) {
  }
}
  
