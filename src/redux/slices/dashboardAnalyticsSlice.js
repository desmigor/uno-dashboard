import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    revenueAnalytics: {},
    deliveryAnalytics: {},
}

const fetchAnalyticsSlice = createSlice({
    name: 'analytics',
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
        }

    }
})

export const { fetchDeliveryAnalytics, fetchDeliveryAnalyticsSuccess, fetchRevenueAnalytics, fetchRevenueAnalyticsSuccess } = fetchAnalyticsSlice.actions;
export default fetchAnalyticsSlice.reducer;