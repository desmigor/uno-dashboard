import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  revenueAnalytics: {},
  deliveryAnalytics: {},
  groupRevenueAnalytics: [],
  groupMileageAnalytics: [],
};

const fetchAnalyticsSlice = createSlice({
  name: "analytics",
  initialState: initialState,
  reducers: {
    fetchDeliveryAnalytics: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchDeliveryAnalyticsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.deliveryAnalytics = payload.data;
    },
    fetchDeliveryAnalyticsError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    fetchRevenueAnalytics: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchRevenueAnalyticsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.revenueAnalytics = payload.data;
    },
    fetchRevenueAnalyticsError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    fetchGroupRevenueAnalytics: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchGroupRevenueAnalyticsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.groupRevenueAnalytics = payload.data;
    },
    fetchGroupMileageAnalytics: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchGroupMileageAnalyticsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.groupMileageAnalytics = payload.data;
    },
  },
});

export const {
  fetchDeliveryAnalytics,
  fetchDeliveryAnalyticsSuccess,
  fetchRevenueAnalytics,
  fetchRevenueAnalyticsSuccess,
  fetchGroupRevenueAnalytics,
  fetchGroupRevenueAnalyticsSuccess,
  fetchGroupMileageAnalytics,
  fetchGroupMileageAnalyticsSuccess,
} = fetchAnalyticsSlice.actions;
export default fetchAnalyticsSlice.reducer;
