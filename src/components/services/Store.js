import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './AuthApi.js';
import { directorApi } from './DirectorApi.js';
import userReducer from './slices/UserSlice.js';

export const Store = configureStore({
    reducer: {

        [authApi.reducerPath]: authApi.reducer,
        [directorApi.reducerPath]: directorApi.reducer,

        user: userReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(directorApi.middleware),
});

setupListeners(Store.dispatch);