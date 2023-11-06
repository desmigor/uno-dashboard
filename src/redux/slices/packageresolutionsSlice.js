import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    resolutionPackages: {},
}

const fetchPendingSlice = createSlice({
    name: 'fetchPending',
    initialState: initialState,
    reducers: {
        fetchPending: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchPendingSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.resolutionPackages = payload.data;
        },
        fetchPendingError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchPending, fetchPendingSuccess, fetchPendingError } = fetchPendingSlice.actions;
export default fetchPendingSlice.reducer;