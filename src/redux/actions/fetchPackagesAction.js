import callAPI from "../../utils/api";
import { fetchPackages, fetchPackagesSuccess } from "../slices/packagesSlice";

export const fetchPackagesAction = () => async (dispatch, getState) => {
  console.log("fetchPackagesAction");
  try {
    const result = await callAPI(
      "/api/packages",
      "GET",
      true
    );
    dispatch(fetchPackages());
    dispatch(fetchPackagesSuccess(result));
  } catch (error) {
    console.log(error);
  }
};
