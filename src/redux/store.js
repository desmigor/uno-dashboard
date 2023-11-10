import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import pendingReducer from './slices/packageresolutionsSlice'
import totalsReducer from './slices/dashboardTotalsSlice'
import packagesReducer from './slices/packagesSlice'
import couriersReducer from './slices/couriersSlice'
import customerReducer from './slices/customersSlice'
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
    },
    middleware: [thunk]
});

export const persistor = persistStore(store);
