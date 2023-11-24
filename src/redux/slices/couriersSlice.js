import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    couriers: [],
    availableCouriers: [],
    availableCounts: 0,
    atworkCouriers: [],
    atworkCounts: 0,
    pausedCouriers: [],
    pausedCounts: 0,
    offlineCouriers: [],
    offlineCounts: 0,
    courierCounts: 0,
    courierDetals: {},
    courierPackages: [],
    courierPackagesCount: 0,
    groupCouriers: [],
    locations: [],
    groups: [],
    groupDetails: {},
    countries: [],
}

const fetchCouriersSlice = createSlice({
    name: 'fetchCouriers',
    initialState: initialState,
    reducers: {
        fetchCouriers: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchCouriersSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.couriers = payload.data;
            state.courierCounts = payload?.count || 0
        },
        fetchCouriersLocations: (state, { payload }) => {
            state.locations = payload.data;
        },
        fetchCouriersAvailable: (state, { payload }) => {
            state.availableCouriers = payload.data;
            state.availableCounts = payload.count;
        },
        fetchCouriersAtWork: (state, { payload }) => {
            state.atworkCouriers = payload.data;
            state.atworkCounts = payload.count;
        },
        fetchCouriersPaused: (state, { payload }) => {
            state.pausedCouriers = payload.data;
            state.pausedCounts = payload.count;
        },
        fetchCouriersOffline: (state, { payload }) => {
            state.offlineCouriers = payload.data;
            state.offlineCounts = payload.count;
        },
        fetchCouriersError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        },
        fetchCourierDetails: (state, { payload }) => {
            state.courierDetals = payload.data;
        },
        fetchCourierPackages: (state, { payload }) => {
            state.courierPackages = payload.data;
            state.courierPackagesCount = payload.count;
        },
        fetchGroups: (state, { payload }) => {
            state.groups = payload.data;
            state.loading = false;
        },
        fetchCoutries: (state, { payload }) => {
            state.countries = payload.data;
        },
        fetchGroupCouriers: (state, { payload }) => {
            state.groupCouriers = payload.data;
        },
        fetchGroupDetails: (state, { payload }) => {
            state.groupDetails = payload.data;
        },
    }
})

export const { fetchCouriers, fetchCouriersSuccess, fetchCouriersError, fetchCouriersLocations, fetchCouriersAvailable, fetchCouriersAtWork, fetchCouriersPaused, fetchCouriersOffline, fetchCourierDetails, fetchCourierPackages, fetchGroups, fetchCoutries, fetchGroupCouriers, fetchGroupDetails } = fetchCouriersSlice.actions;
export default fetchCouriersSlice.reducer;