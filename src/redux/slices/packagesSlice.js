import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    packages: [],
    ongoings: [],
    completed: [],
    canceled: [],
    ongoingCounts: 0,
    completedCounts: 0,
    canceledCounts: 0,
    selectedPackage: null,
    pickupLocationItem: null,
    dropLocationItem: null,
}

const fetchPackagesSlice = createSlice({
    name: 'fetchPackages',
    initialState: initialState,
    reducers: {
        fetchPackages: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchPackagesSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.packages = payload.data;
        },
        fetchSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        fetchPackagesError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        },
        fetchOngoingPackages: (state, { payload }) => {
            state.ongoings = payload.data;
            state.ongoingCounts = payload.count;
            state.loading = false;
        },
        fetchCompletedPackages: (state, { payload }) => {
            state.completed = payload.data;
            state.completedCounts = payload.count;
            state.loading = false;
        },
        fetchCanceledPackages: (state, { payload }) => {
            state.canceled = payload.data;
            state.canceledCounts = payload.count;
            state.loading = false;
        },
        fetchPackageDetail: (state, { payload }) => {
            state.selectedPackage = payload;
            state.loading = false;
        },
        fetchAddPackageAddresses: (state, { payload }) => {
            state.pickupLocationItem = payload.pickup;
            state.dropLocationItem = payload.drop;
        }
    }
})

export const { fetchPackages, fetchPackagesSuccess, fetchPackagesError, fetchOngoingPackages, fetchCompletedPackages, fetchCanceledPackages, fetchPackageDetail, fetchSuccess, fetchAddPackageAddresses } = fetchPackagesSlice.actions;
export default fetchPackagesSlice.reducer;