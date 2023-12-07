import callAPI from "../../utils/api";
import {
  fetchDeliveryAnalytics,
  fetchDeliveryAnalyticsSuccess,
  fetchRevenueAnalytics,
  fetchRevenueAnalyticsSuccess,
  fetchGroupMileageAnalytics,
  fetchGroupMileageAnalyticsSuccess,
  fetchGroupRevenueAnalytics,
  fetchGroupRevenueAnalyticsSuccess,
} from "../slices/dashboardAnalyticsSlice";

export const fetchRevenueAnalyticsAction =
  (filter = null) =>
  async (dispatch, getState) => {
    try {
      const result = await callAPI(
        filter
          ? `/api/admin/revenue-analytic?group=${filter}`
          : "/api/admin/revenue-analytic",
        "POST",
        true
      );
      dispatch(fetchRevenueAnalytics());
      dispatch(fetchRevenueAnalyticsSuccess(result));
    } catch (error) {}
  };

export const fetchDeliveryAnalyticsAction =
  (filter = null) =>
  async (dispatch, getState) => {
    try {
      const result = await callAPI(
        filter
          ? `/api/admin/delivery-analytic?group=${filter}`
          : "/api/admin/delivery-analytic",
        "POST",
        true
      );
      dispatch(fetchDeliveryAnalytics());
      dispatch(fetchDeliveryAnalyticsSuccess(result));
    } catch (error) {}
  };

export const fetchGroupRevenueAnalyticsAction = () => async (
  dispatch,
  getState
) => {
  try {
    const result = await callAPI(
      "/api/admin/group-analytic/revenue/",
      "GET",
      true
    );
    dispatch(fetchGroupRevenueAnalytics());
    dispatch(fetchGroupRevenueAnalyticsSuccess(result));
  } catch (error) {}
}

export const fetchGroupMileageAnalyticsAction = () => async (
  dispatch,
  getState
) => {
  try {
    const result = await callAPI(
      "/api/admin/group-analytic/mileage/",
      "GET",
      true
    );
    dispatch(fetchGroupMileageAnalytics());
    dispatch(fetchGroupMileageAnalyticsSuccess(result));
  } catch (error) {}
}