import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './AuthApi.js';
import userReducer from './slices/UserSlice.js';

export const Store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});