import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import packageInputReducer from './slices/packageInputs'
import pendingReducer from './slices/packageresolutionsSlice'
import totalsReducer from './slices/dashboardTotalsSlice'
import packagesReducer from './slices/packagesSlice'
import couriersReducer from './slices/couriersSlice'
import customerReducer from './slices/customersSlice'
import oneCourierReducer from './slices/oneCourierSlice'
import oneCustomerReducer from './slices/oneCustomerSlice'
import matchedCouriers from "./slices/matchedCouriersSlice";
import packageSizesReducer from "./slices/packageSizesSlice";
import accountActionReducer from "./slices/accountNotificationsSlice";
import ProfileReducer from "./slices/userProfileSlice";
import vehicleTypesReducer from "./slices/vehicleTypesSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedReducerPackage = persistReducer(persistConfig, packageInputReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        fetchPending: pendingReducer,
        fetchTotals: totalsReducer,
        fetchPackages: packagesReducer,
        fetchCouriers: couriersReducer,
        fetchCustomers: customerReducer,
        fetchOneCourier: oneCourierReducer,
        fetchOneCustomer: oneCustomerReducer,
        fetchMatchCouriers: matchedCouriers,
        fetchPackageSizes: packageSizesReducer,
        fetchAccountNotifications: accountActionReducer,
        packages: persistedReducerPackage,
        vehicleTypes: vehicleTypesReducer
    },
    middleware: [thunk]
});

export const persistor = persistStore(store);
