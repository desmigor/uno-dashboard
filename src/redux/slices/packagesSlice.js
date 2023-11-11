import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    packages: {},
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
        fetchPackagesError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchPackages, fetchPackagesSuccess, fetchPackagesError } = fetchPackagesSlice.actions;
export default fetchPackagesSlice.reducer;