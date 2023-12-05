import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    accountNotifications: {},
}

const fetchAccountNotificationsActionSlice = createSlice({
    name: 'fetchAccountNotificationsAction',
    initialState: initialState,
    reducers: {
        fetchAccountNotificationsAction: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchAccountNotificationsActionSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.accountNotifications = payload.data;
        },
        fetchAccountNotificationsActionError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchAccountNotificationsAction, fetchAccountNotificationsActionSuccess, fetchAccountNotificationsActionError } = fetchAccountNotificationsActionSlice.actions;
export default fetchAccountNotificationsActionSlice.reducer;