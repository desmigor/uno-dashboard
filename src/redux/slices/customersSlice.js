import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    customers: [],
}

const fetchCustomersSlice = createSlice({
    name: 'fetchCustomers',
    initialState: initialState,
    reducers: {
        fetchCustomers: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;

        },
        fetchCustomersSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.customers = payload.data;
        },
        fetchCustomersError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchCustomers, fetchCustomersSuccess, fetchCustomersError } = fetchCustomersSlice.actions;
export default fetchCustomersSlice.reducer;