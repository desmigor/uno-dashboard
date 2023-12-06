import callAPI from "../../utils/api";
import {
  fetchProfile,
  fetchProfileSuccess,
  fetchCountriesSuccess,
} from "../slices/userProfileSlice";
import { update_user_info } from "../slices/authSlice";

export const fetchProfileAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI("/api/auth/web/profile/", "GET", true);
    dispatch(fetchProfile());
    dispatch(fetchProfileSuccess(result));
    dispatch(
      update_user_info({
        full_name: result.data.full_name,
        email: result.data.email,
        profile_photo_link: result.data.profile_photo_link,
      })
    );
  } catch (error) {

  }
};

export const fetchCountriesAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI("/api/country/", "GET", true);
    dispatch(fetchCountriesSuccess(result));
  } catch (error) {}
};
