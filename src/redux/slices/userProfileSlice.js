import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    profile: {},
}

const fetchProfileSlice = createSlice({
    name: 'fetchProfile',
    initialState: initialState,
    reducers: {
        fetchProfile: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchProfileSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.profile = payload.data;
        },
        fetchProfileError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchProfile, fetchProfileSuccess, fetchProfileError } = fetchProfileSlice.actions;
export default fetchProfileSlice.reducer;