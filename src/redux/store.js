import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import pendingReducer from './slices/packageresolutionsSlice'
import totalsReducer from './slices/dashboardTotalsSlice'
import packagesReducer from './slices/packagesSlice'
import couriersReducer from './slices/couriersSlice'
import customerReducer from './slices/customersSlice'
<<<<<<< HEAD
import oneCourierReducer from './slices/oneCourierSlice'
import oneCustomerReducer from './slices/oneCustomerSlice'
import matchedCouriers from "./slices/matchedCouriersSlice";
=======
import packageSizesReducer from "./slices/packageSizesSlice";
>>>>>>> add fetching package sizes and package add ons
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        fetchPending: pendingReducer,
        fetchTotals: totalsReducer,
        fetchPackages: packagesReducer,
        fetchCouriers: couriersReducer,
        fetchCustomers: customerReducer,
<<<<<<< HEAD
        fetchOneCourier: oneCourierReducer,
        fetchOneCustomer: oneCustomerReducer,
        fetchMatchCouriers: matchedCouriers
=======
        fetchPackageSizes: packageSizesReducer,
>>>>>>> add fetching package sizes and package add ons
    },
    middleware: [thunk]
});

export const persistor = persistStore(store);
