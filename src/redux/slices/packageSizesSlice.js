import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    packageSizes: [],
    packageAddOns: [],
}

const fetchPackageSizesSlice = createSlice({
    name: 'fetchPackageSizes',
    initialState: initialState,
    reducers: {
        fetchPackageSizes: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchPackageSizesSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.packageSizes = payload.data;
        },
        fetchPackageSizesError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        },
        fetchPackageAddOns: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchPackageAddOnsSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.packageAddOns = payload.data;
        },

    }
})

export const { fetchPackageSizes, fetchPackageSizesSuccess, fetchPackageSizesError, fetchPackageAddOns,fetchPackageAddOnsSuccess } = fetchPackageSizesSlice.actions;
export default fetchPackageSizesSlice.reducer;