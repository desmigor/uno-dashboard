import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    profile: {},
    countries: []
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
        },
        fetchCountriesSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.countries = payload.data;
        },

    }
})

export const { fetchProfile, fetchProfileSuccess, fetchProfileError,fetchCountriesSuccess } = fetchProfileSlice.actions;
export default fetchProfileSlice.reducer;