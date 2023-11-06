import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    totals: {},
}

const fetchTotalsSlice = createSlice({
    name: 'fetchTotals',
    initialState: initialState,
    reducers: {
        fetchTotals: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchTotalsSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.totals = payload.data;
        },
        fetchTotalsError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchTotals, fetchTotalsSuccess, fetchTotalsError } = fetchTotalsSlice.actions;
export default fetchTotalsSlice.reducer;