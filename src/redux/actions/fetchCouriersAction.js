import callAPI from "../../utils/api";
import { fetchCouriers, fetchCouriersLocations, fetchCouriersSuccess } from "../slices/couriersSlice";

export const fetchCouriersAction =
  (top = false) =>
  async (dispatch, getState) => {
    try {
      const result = await callAPI(
        top ? "/api/courier/top/" : "/api/courier/all/",
        "GET",
        true
      );
      dispatch(fetchCouriers());
      dispatch(fetchCouriersSuccess(result));
    } catch (error) {
      console.log(error);
    }
  };


export const fetchCouriersLocationsAction = () => async (dispatch, getState) => {
  try {
    const results = await callAPI('/api/courier/available-location/', 'GET', true);
    dispatch(fetchCouriersLocations(results));
  } catch (error) {
    
  }
}
