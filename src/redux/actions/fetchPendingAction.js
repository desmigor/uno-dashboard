import callAPI from "../../utils/api";
import {
  fetchPending,
  fetchPendingSuccess,
} from "../slices/packageresolutionsSlice";

export const fetchPendingAction =
  ( search = "", sort = "-created_at" ) =>
  async (dispatch, getState) => {
    try {
      const result = await callAPI(
        "/api/resolution/packages/?all=true&status=1&search=" +
          search +
          "&ordering=" +
          sort,
        "GET",
        true
      );

      dispatch(fetchPending());
      dispatch(fetchPendingSuccess(result));
    } catch (error) {}
  };
