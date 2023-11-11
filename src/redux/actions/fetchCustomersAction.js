import callAPI from "../../utils/api";
import { fetchCustomers, fetchCustomersSuccess } from "../slices/customersSlice";

export const fetchCustomersAction =
  () =>
  async (dispatch, getState) => {
    try {
      const result = await callAPI(
        "/api/customer/new/",
        "GET",
        true
      );
      console.log("fetchCustomersAction");
      console.log(result);
      dispatch(fetchCustomers());
      dispatch(fetchCustomersSuccess(result));
    } catch (error) {
      console.log(error);
    }
  };
