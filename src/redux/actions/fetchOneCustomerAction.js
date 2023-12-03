import callAPI from "../../utils/api";
import { fetchOneCustomer, fetchOneCustomerSuccess } from "../slices/oneCustomerSlice";

export const fetchOneCustomerAction = (id) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/resolution/packages/users/" + id + "/customer",
      "GET",
      true
    );
    dispatch(fetchOneCustomer());
    dispatch(fetchOneCustomerSuccess(result));
  } catch (error) {
    console.log(error);
  }
};
