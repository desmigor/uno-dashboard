import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addressDetails: null,
    packageDetailsPayment: null,
    summary: null,
    step: 0,
    pickupAddresses: null,
    deliveryAddresses: null,
}

const packageInputsSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        addAddresses: (state, { payload }) => {
            state.addressDetails = payload;
            state.step = 1;
        },
        addPackageDetails: (state, { payload }) => {
            state.packageDetailsPayment = payload;
            state.step = 2;
        },
        addSummary: (state, { payload }) => {
            state.summary = payload;
        },
        storePickupAddresses: (state, { payload }) => {
            state.pickupAddresses = payload;
        },
        storeDeliveryAddresses: (state, { payload }) => {
            state.deliveryAddresses = payload;
        }
    }
})

export const { addAddresses, addPackageDetails, addSummary } = packageInputsSlice.actions;
export default packageInputsSlice.reducer; 
