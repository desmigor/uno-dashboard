import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    couriers: [],
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
        },
        fetchCouriersError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchCouriers, fetchCouriersSuccess, fetchCouriersError } = fetchCouriersSlice.actions;
export default fetchCouriersSlice.reducer;