import callAPI from "../../utils/api";
import { fetchCouriers, fetchCouriersSuccess } from "../slices/couriersSlice";

export const fetchCouriersAction = () => async (dispatch, getState) => {
  console.log("fetchCouriersAction");
  try {
    const result = await callAPI(
      "/api/courier/all/",
      "GET",
      true
    );
    dispatch(fetchCouriers());
    dispatch(fetchCouriersSuccess(result));
  } catch (error) {
    console.log(error);
  }
};
