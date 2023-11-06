import callAPI from "../../utils/api";
import { fetchPending, fetchPendingSuccess } from "../slices/fetchPendingSlice";

export const fetchPendingAction = () => async (dispatch, getState) => {
  console.log("fetchPendingAction");
  try {
    const result = await callAPI(
      "/api/resolution/packages/?all=true&status=all",
      "GET",
      true
    );
    dispatch(fetchPending());
    dispatch(fetchPendingSuccess(result));
  } catch (error) {
    console.log(error);
  }
};
