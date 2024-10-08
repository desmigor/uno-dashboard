import callAPI from "../../utils/api";
import { fetchCustomers, fetchCustomersActive, fetchCustomersDetails, fetchCustomersError, fetchCustomersSuccess, fetchCustomersSuspended } from "../slices/customersSlice";
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
    const results = await callAPI(`/api/customer/active/?page=${page}&count=${count}`, 'GET');
    dispatch(fetchCustomersActive(results));
  } catch (error) {
    
  }
}

export const fetchCustomersSuspendedAction = (page=1, count=5) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/customer/suspended/?page=${page}&count=${count}`, 'GET');
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

export const searchCustomersActiveAction = (page=1, count=5, search) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/customer/active/?search=${search}&count=${count}`, 'GET');
    dispatch(fetchCustomersActive(results));
  } catch (error) {
    
  }
}

export const searchCustomersSuspendedAction = (page=1, count=5, search) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/customer/suspended/?search=${search}&count=${count}`, 'GET');
    dispatch(fetchCustomersSuspended(results));
  } catch (error) {
  }
}

export const handleupdateCustomer = (id, payload, navigate) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/customer/${id}/`, 'PUT', true, payload);
    dispatch(fetchCustomersActiveAction(1, 5));
    dispatch(fetchCustomersSuspendedAction(1, 5));
    navigate('/admin/dashboard/customers');
  } catch (error) {
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

export const fetchCustomersDetailsAction = (id) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/customer/${id}/`, 'GET');
    dispatch(fetchCustomersDetails(results));
    return results;
  } catch (error) {
    
  }
}
