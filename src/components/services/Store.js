import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './AuthApi.js';
import { directorApi } from './DirectorApi.js';
import { parentApi } from './ParentApi.js';
import { ceoApi } from './CeoApi.js';
import userReducer from './slices/UserSlice.js';

export const Store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [directorApi.reducerPath]: directorApi.reducer,
        [parentApi.reducerPath]: parentApi.reducer,
        [ceoApi.reducerPath]: ceoApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(directorApi.middleware)
            .concat(parentApi.middleware)
            .concat(ceoApi.middleware),
});

setupListeners(Store.dispatch);