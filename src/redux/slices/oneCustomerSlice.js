import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    customer: {},
}

const fetchOneCustomerSlice = createSlice({
    name: 'fetchOneCustomer',
    initialState: initialState,
    reducers: {
        fetchOneCustomer: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchOneCustomerSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.customer = payload.data;
        },
        fetchOneCustomerError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchOneCustomer, fetchOneCustomerSuccess, fetchOneCustomerError } = fetchOneCustomerSlice.actions;
export default fetchOneCustomerSlice.reducer;