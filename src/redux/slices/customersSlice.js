import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    customers: [],
    customersActive: [],
    customersActiveCounts: 0,
    customersSuspended: [],
    customersSuspendedCounts: 0,
    customerDetails: {}
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
        },
        fetchCustomersActive: (state, { payload }) => {
            state.customersActive = payload.data;
            state.customersActiveCounts = payload.count;
            state.loading = false;
        },
        fetchCustomersSuspended: (state, { payload }) => {
            state.customersSuspended = payload.data;
            state.customersSuspendedCounts = payload.count;
            state.loading = false;
        },
    }
})

export const { fetchCustomers, fetchCustomersSuccess, fetchCustomersError, fetchCustomersActive, fetchCustomersSuspended } = fetchCustomersSlice.actions;
export default fetchCustomersSlice.reducer;