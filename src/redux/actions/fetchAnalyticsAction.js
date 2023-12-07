import callAPI from "../../utils/api";
import {
  fetchDeliveryAnalytics,
  fetchDeliveryAnalyticsSuccess,
  fetchRevenueAnalytics,
  fetchRevenueAnalyticsSuccess,
} from "../slices/dashboardAnalyticsSlice";

export const fetchRevenueAnalyticsAction = () => async (dispatch, getState) => {
  try {
    const result = await callAPI("/api/admin/revenue-analytic", "POST", true);
    dispatch(fetchRevenueAnalytics());
    dispatch(fetchRevenueAnalyticsSuccess(result));
  } catch (error) {}
};

export const fetchDeliveryAnalyticsAction =
  () => async (dispatch, getState) => {
    try {
      const result = await callAPI(
        "/api/admin/delivery-analytic",
        "POST",
        true
      );
      dispatch(fetchDeliveryAnalytics());
      dispatch(fetchDeliveryAnalyticsSuccess(result));
    } catch (error) {}
  };
