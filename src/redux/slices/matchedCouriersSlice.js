import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    couriers: [],
}

const fetchMatchCouriersSlice = createSlice({
    name: 'fetchMatchCouriers',
    initialState: initialState,
    reducers: {
        fetchMatchCouriers: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchMatchCouriersSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.couriers = payload.data;
        },
        fetchMatchCouriersError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchMatchCouriers, fetchMatchCouriersSuccess, fetchMatchCouriersError } = fetchMatchCouriersSlice.actions;
export default fetchMatchCouriersSlice.reducer;