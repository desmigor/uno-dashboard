import callAPI from "../../utils/api";
import { fetchPackageSizes, fetchPackageSizesSuccess,fetchPackageAddOns,fetchPackageAddOnsSuccess } from "../slices/packageSizesSlice";

export const fetchPackageSizesAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/package-settings/package-size/",
      "GET",
      true
    );
    dispatch(fetchPackageSizes());
    dispatch(fetchPackageSizesSuccess(result));
  } catch (error) {
  }
};

export const fetchPackageAddOnsAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI(
      "/api/package-settings/package-addon/",
      "GET",
      true
    );
    dispatch(fetchPackageAddOns());
    dispatch(fetchPackageAddOnsSuccess(result));
  } catch (error) {
  }
}
