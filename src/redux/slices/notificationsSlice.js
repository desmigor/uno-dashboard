import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    notifications: {},
}

const fetchNotificationsActionSlice = createSlice({
    name: 'notifications',
    initialState: initialState,
    reducers: {
        fetchNotifications: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchNotificationsSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.notifications = payload.data;
        },
        fetchNotificationsError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchNotifications, fetchNotificationsSuccess, fetchNotificationsError } = fetchNotificationsActionSlice.actions;
export default fetchNotificationsActionSlice.reducer;