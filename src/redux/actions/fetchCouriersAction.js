import callAPI from "../../utils/api";
import { fetchCourierDetails, fetchCourierPackages, fetchCouriers, fetchCouriersAtWork, fetchCouriersAvailable, fetchCouriersLocations, fetchCouriersOffline, fetchCouriersPaused, fetchCouriersSuccess, fetchCoutries, fetchGroupCouriers, fetchGroupDetails, fetchGroups } from "../slices/couriersSlice";

export const fetchCouriersAction =
  (top = false, count = 5, page = 1) =>
  async (dispatch, getState) => {
    try {
      const result = await callAPI(
        top ? "/api/courier/top/" : `/api/courier/couriers/?page=${page}&count=${count}`,
        "GET",
        true
      );
      dispatch(fetchCouriers());
      dispatch(fetchCouriersSuccess(result));
    } catch (error) {
    }
  };


export const fetchCouriersLocationsAction = () => async (dispatch, getState) => {
  try {
    const results = await callAPI('/api/courier/available-location/', 'GET', true);
    dispatch(fetchCouriersLocations(results));
  } catch (error) {
    
  }
}

export const fetchAvailableCouriers = (count=5, page = 1) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/courier/couriers/available/?page=${page}&count=${count}`);
    dispatch(fetchCouriersAvailable(results));
  } catch (error) {
    
  }
} 

export const fetchAtWorkCouriers = (count=5, page = 1) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/courier/couriers/at-work/?page=${page}&count=${count}`);
    dispatch(fetchCouriersAtWork(results));
  } catch (error) {
    
  }
}

export const fetchPausedCouriers = (count=5, page = 1) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/courier/couriers/paused/?page=${page}&count=${count}`);
    dispatch(fetchCouriersPaused(results));
  } catch (error) {
    
  }
}

export const fetchOfflineCouriers = (count=5, page = 1) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/courier/couriers/offline/?page=${page}&count=${count}`);
    dispatch(fetchCouriersOffline(results));
  } catch (error) {
    
  }
}

export const fetchDetailsCouriers = (id) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/courier/couriers/${id}/`);
    dispatch(fetchCourierDetails(results));
  } catch (error) {
    
  }
}

export const fetchCouriersPackagesAction = (page=1, count=5, id) => async (dispatch, getState) => {
  try {
    const payload = {
      courier_id: id,
    }
    const results = await callAPI(`/api/courier/couriers/details/package-list/?page=${page}&count=${count}`, 'POST', true, payload);
    dispatch(fetchCourierPackages(results));
  } catch (error) {
    
  }
}

export const fetchGroupsAction = () => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/courier/courier-groups/`);
    dispatch(fetchGroups(results))
  } catch (error) {
    
  }
}

export const createGroupAction = (payload, navigate) => async (dispatch, getState) => {
  try {
    dispatch(fetchCouriers());
    const results = await callAPI('/api/courier/courier-groups/', 'POST', true, payload);
    dispatch(fetchGroupsAction(results));
    navigate('/admin/dashboard/courier/groups/');
  } catch (error) {
    
  }
}

export const fetchCountriesActions = () => async (dispatch, getState) => {
  try {
    const results = await callAPI('/api/country/', 'GET', false);
    dispatch(fetchCoutries(results));
  } catch (error) {
    
  }
} 

export const fetchGroupsCouriersActions = (id, page=1, count=5) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/courier/courier-groups/${id}/courier-list/?page=${page}&count=${count}`);
    dispatch(fetchGroupCouriers(results));
  } catch (error) {
    
  }
} 

export const fetchGroupDetailsAction = (id) => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/courier/courier-groups/${id}`);
    dispatch(fetchGroupDetails(results));
  } catch (error) {
    
  }
}
