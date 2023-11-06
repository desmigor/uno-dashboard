import callAPI from "../../utils/api";
import { fetchTotals, fetchTotalsSuccess } from "../slices/dashboardTotalsSlice";

export const fetchTotalsAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/support/total-data",
      "GET",
      true
    );
    dispatch(fetchTotals());
    dispatch(fetchTotalsSuccess(result));
  } catch (error) {
    console.log(error);
  }
};
