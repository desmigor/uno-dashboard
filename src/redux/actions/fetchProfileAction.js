import callAPI from "../../utils/api";
import { fetchProfile, fetchProfileSuccess } from "../slices/userProfileSlice";

export const fetchProfileAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/auth/web/profile/",
      "GET",
      true
    );
    dispatch(fetchProfile());
    dispatch(fetchProfileSuccess(result));
  } catch (error) {
  }
};
