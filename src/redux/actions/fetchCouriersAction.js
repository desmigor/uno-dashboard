import callAPI from "../../utils/api";
import { fetchCourierDetails, fetchCourierPackages, fetchCouriers, fetchCouriersAtWork, fetchCouriersAvailable, fetchCouriersError, fetchCouriersLocations, fetchCouriersOffline, fetchCouriersPaused, fetchCouriersSuccess, fetchCoutries, fetchGroupCouriers, fetchGroupDetails, fetchGroups, fetchVehicle } from "../slices/couriersSlice";
import { fetchCustomersError } from "../slices/customersSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    return results;
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
    return results;
  } catch (error) {
    
  }
}

export const fetchVehiclesAction = () => async (dispatch, getState) => {
  try {
    const results = await callAPI(`/api/admin/vehicle-type/`);
    dispatch(fetchVehicle(results));
  } catch (error) {
    
  }
}

export const addCourierAction = (payload, navigate) => async (dispatch, getState) => {
  try {
    dispatch(fetchCouriers());
    const results = await callAPI(`/api/courier/couriers/add/`, 'POST', true, payload);
    dispatch(fetchAvailableCouriers());
    navigate('/admin/dashboard/courier');
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

export const updateGroupAction = (payload, id, navigate) => async (dispatch, getState) => {
  try {
    dispatch(fetchCouriers());
    const results = await callAPI(`/api/courier/courier-groups/${id}`, 'PUT', true, payload);
    dispatch(fetchGroupsAction(results));
    navigate('/admin/dashboard/courier/groups/');
  } catch (error) {
    dispatch(fetchCouriersError(error));
  }
}

export const updateCourierAction = (payload, navigate) => async (dispatch, getState) => {
  try {
    dispatch(fetchCouriers());
    await callAPI(`/api/courier/couriers/update/`, 'POST', true, payload);
    dispatch(fetchAvailableCouriers());
    navigate('/admin/dashboard/courier');
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
