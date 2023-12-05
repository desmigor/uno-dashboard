import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    courier: {},
}

const fetchOneCourierSlice = createSlice({
    name: 'fetchOneCourier',
    initialState: initialState,
    reducers: {
        fetchOneCourier: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchOneCourierSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.courier = payload.data;
        },
        fetchOneCourierError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchOneCourier, fetchOneCourierSuccess, fetchOneCourierError } = fetchOneCourierSlice.actions;
export default fetchOneCourierSlice.reducer;