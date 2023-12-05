import callAPI from "../../utils/api";
import { fetchCanceledPackages, fetchCompletedPackages, fetchOngoingPackages, fetchPackageDetail, fetchPackages, fetchPackagesSuccess, fetchSuccess } from "../slices/packagesSlice";

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
    
    console.log(result, 'KKKKK');
    dispatch(fetchSuccess());
    dispatch(fetchPackagesCanceledAction(1, 5));
    dispatch(fetchPackagesCompletedAction(1, 5));
    dispatch(fetchPackagesOngoingAction(1, 5));
  } catch (error) {
    dispatch(fetchSuccess());
    console.log(error, 'KKKKK');
  }
}

export const addPackagesPickupAddress = (item) => async (dispatch, getState) => {
  try {
    const payload = {
      "title" : "Pickup Address",
      "open_address" : item?.formatted_address,
      "landmark": "",
      "location": item?.country,
      "contact_person": item?.name,
      "contact_phone" : item?.phone,
      "contact_country": 1,
      "latitude": item?.latitude,
      "longitude" : item?.longitude,
      "address_type" : 1,
      "temporary" : true
    }
  } catch (error) {
    
  }
}
