import callAPI from "../../utils/api";
import { fetchAddPackageAddresses, fetchCanceledPackages, fetchCompletedPackages, fetchOngoingPackages, fetchPackageDetail, fetchPackages, fetchPackagesSuccess, fetchSuccess } from "../slices/packagesSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchPackagesAction = () => async (dispatch, getState) => {
  try {
    dispatch(fetchPackages());
    const result = await callAPI(
      "/api/packages/",
      "GET",
      true
    );
    dispatch(fetchPackagesSuccess(result));
  } catch (error) {
    console.log(error);
  }
};

export const fetchPackagesOngoingAction = (page, count) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      `/api/packages/ongoing/?page=${page}&count=${count}`,
      "GET",
      true
    );
    dispatch(fetchOngoingPackages(result));
  } catch (error) {
  }
};

export const fetchPackagesCompletedAction = (page, count) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      `/api/packages/completed/?page=${page}&count=${count}`,
      "GET",
      true
    );
    dispatch(fetchCompletedPackages(result));
  } catch (error) {
  }
};

export const fetchPackagesCanceledAction = (page, count) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      `/api/packages/cancelled/?page=${page}&count=${count}`,
      "GET",
      true
    );
    dispatch(fetchCanceledPackages(result));
  } catch (error) {
    console.log(error);
  }
};

export const fetchPackageDetails = (id) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      `/api/packages/${id}/details/`,
      'GET',
      true
    );
    dispatch(fetchPackageDetail(result.data));
    return result.data;
  } catch (error) {
  }
}

export const cancelPackage = (id) => async (dispatch, getState) => {
  try {
    dispatch(fetchPackages())
    const payload = {
      "cancel": true
    }

    const result = await callAPI(
      `/api/packages/${id}/cancel/`,
      'PUT',
      true,
      payload
    );
    
    dispatch(fetchSuccess());
    dispatch(fetchPackagesCanceledAction(1, 5));
    dispatch(fetchPackagesCompletedAction(1, 5));
    dispatch(fetchPackagesOngoingAction(1, 5));
  } catch (error) {
    dispatch(fetchSuccess());
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

export const addPackagesPickupAddressAction = (pickup, drop) => async (dispatch, getState) => {
  try {
    const payloadPickup = {
      "title" : "Pickup Address",
      "open_address" : pickup?.formatted_address,
      "landmark": pickup?.coment,
      "location": pickup?.country,
      "contact_person": pickup?.name,
      "contact_phone" : pickup?.phone,
      "contact_country": 1,
      "latitude": pickup?.latitude,
      "longitude" : pickup?.longitude,
      "address_type" : 1,
      "temporary" : true
    }

    const payloadDrop = {
      "title" : "Drop Address",
      "open_address" : drop?.formatted_address,
      "landmark": drop?.coment,
      "location": drop?.country,
      "contact_person": drop?.name,
      "contact_phone" : drop?.phone,
      "contact_country": 1,
      "latitude": drop?.latitude,
      "longitude" : drop?.longitude,
      "address_type" : 1,
      "temporary" : true
    }

    const resultsPickup = await callAPI('/api/address/user-address/', 'POST', true, payloadPickup);
    const resultsDrop = await callAPI('/api/address/user-address/', 'POST', true, payloadDrop);

    const payloadToSendInRedux = {
      pickup: resultsPickup,
      drop: resultsDrop,
    };

    dispatch(fetchAddPackageAddresses(payloadToSendInRedux));

  } catch (error) {
    
  }
}

export const fetchPackagesOngoingActionSearch = (search, order) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      `/api/packages/ongoing/?search=${search}&ordering=${order}`,
      "GET",
      true
    );
    dispatch(fetchOngoingPackages(result));
  } catch (error) {
  }
};

export const fetchPackagesCompletedActionSearch = (search, order) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      `/api/packages/completed/?search=${search}&ordering=${order}`,
      "GET",
      true
    );
    dispatch(fetchCompletedPackages(result));
  } catch (error) {
  }
};

export const fetchPackagesCanceledActionSearch= (search, order) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      `/api/packages/cancelled/?search=${search}&ordering=${order}`,
      "GET",
      true
    );
    dispatch(fetchCanceledPackages(result));
  } catch (error) {
  }
};


