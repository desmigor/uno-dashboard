import callAPI from "../../utils/api";
import { fetchCustomers, fetchCustomersActive, fetchCustomersError, fetchCustomersSuccess, fetchCustomersSuspended } from "../slices/customersSlice";
import { toast } from 'react-toastify';

export const fetchCustomersAction =
  () =>
  async (dispatch, getState) => {
    try {
      const result = await callAPI(
        "/api/customer/new/",
        "GET",
        true
      );
      dispatch(fetchCustomers());
      dispatch(fetchCustomersSuccess(result));
    } catch (error) {
      console.log(error);
    }
};

export const fetchCustomersActiveAction = (page=1, count=5) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/customer/active/?page=${page}&count=${count}`);
    dispatch(fetchCustomersActive(results));
  } catch (error) {
    
  }
}

export const fetchCustomersSuspendedAction = (page=1, count=5) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/customer/suspended/?page=${page}&count=${count}`);
    dispatch(fetchCustomersSuspended(results));
  } catch (error) {
    
  }
}

export const createCustomerAction = (payload, navigate) => async (dispatch, getState) => {
  try {
    dispatch(fetchCustomers());
    const results = await callAPI(`/api/customer/`, 'POST', true, payload);
    dispatch(fetchCustomersActiveAction(1, 5));
    navigate('/admin/dashboard/customers');
  } catch (error) {
    dispatch(fetchCustomersError(error.response.data.message));
    toast.error(error.response.data.message, {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
}
