import callAPI from "../../utils/api";
import { fetchVehicleTypes, fetchVehicleTypesSuccess } from "../slices/vehicleTypesSlice";

export const fetchVehicleTypesAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/admin/vehicle-type/",
      "GET",
      true
    );
    dispatch(fetchVehicleTypes());
    dispatch(fetchVehicleTypesSuccess(result));
  } catch (error) {
  }
};


export const fetchVehicleTypeDetailAction = (id) => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      `/api/admin/vehicle-type/${id}`,
      "GET",
      true
    );
    return result;
  } catch (error) {
  }
}
