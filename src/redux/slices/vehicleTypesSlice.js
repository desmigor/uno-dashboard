import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    vehicleTypes: {},
}

const fetchVehicleTypesSlice = createSlice({
    name: 'fetchVehicleTypes',
    initialState: initialState,
    reducers: {
        fetchVehicleTypes: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchVehicleTypesSuccess: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.vehicleTypes = payload.data;
        },
        fetchVehicleTypesError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        }
    }
})

export const { fetchVehicleTypes, fetchVehicleTypesSuccess, fetchVehicleTypesError } = fetchVehicleTypesSlice.actions;
export default fetchVehicleTypesSlice.reducer;