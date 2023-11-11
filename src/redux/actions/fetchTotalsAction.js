import callAPI from "../../utils/api";
import {
  fetchTotals,
  fetchTotalsSuccess,
} from "../slices/dashboardTotalsSlice";

export const fetchTotalsAction =
  (admin = false) =>
  async (dispatch, getState) => {
    try {
      const result = await callAPI(
        admin ? "/api/admin/total-data" : "/api/support/total-data",
        "GET",
        true
      );
      dispatch(fetchTotals());
      dispatch(fetchTotalsSuccess(result));
    } catch (error) {
      console.log(error);
    }
  };
