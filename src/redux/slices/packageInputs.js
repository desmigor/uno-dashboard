import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addressDetails: null,
    packageDetailsPayment: null,
    summary: null,
    step: 0,
    pickupAddresses: null,
    deliveryAddresses: null,
    pickupLocation: null,
    dropLocation: null,
    index: null,
    inputss: [{ pickupAddress: '', dropAddress: '', pickup: {}, drop: {}, pickupSearch: [], deliverySearch: [], full_name_pickup: '', full_name_drop: '', phone_number_pickup: '', phone_number_drop: '', comment_pickup: '', comment_drop: '', choosenMethod: 0, size: 0, chosenAddons: [], distance: 0, price: 0, discount: 0, total: 0 }],
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
        },
        storeLocation: (state, { payload }) => {
            state.pickupLocation = payload.pickup;
            state.dropLocation = payload.drop;
            state.index = payload.index;
        },
        handleInputs: (state, { payload }) => {
            state.inputss = payload;
        },
    }
})

export const { addAddresses, addPackageDetails, addSummary, storeLocation, handleInputs } = packageInputsSlice.actions;
export default packageInputsSlice.reducer; 
