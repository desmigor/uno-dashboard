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
