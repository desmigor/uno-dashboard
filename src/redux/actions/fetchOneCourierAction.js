import callAPI from "../../utils/api";
import { fetchOneCourier, fetchOneCourierSuccess } from "../slices/oneCourierSlice";

export const fetchOneCourierAction = (id) => async (dispatch, getState) => {
  console.log("fetchOneCourierAction");
  try {
    const result = await callAPI(
      "/api/resolution/packages/users/" + id + "/courier",
      "GET",
      true
    );
    dispatch(fetchOneCourier());
    dispatch(fetchOneCourierSuccess(result));
  } catch (error) {
    console.log(error);
  }
};
