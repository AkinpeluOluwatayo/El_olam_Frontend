import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/el_olam/auth',
    }),
    endpoints: (builder) => ({
        // Shared Admin Login (Tries CEO then Director)
        ceoLogin: builder.mutation({
            query: (credentials) => ({ url: '/login/ceo', method: 'POST', body: credentials }),
        }),
        directorLogin: builder.mutation({
            query: (credentials) => ({ url: '/login/director', method: 'POST', body: credentials }),
        }),

        // Dedicated Parent Login
        parentLogin: builder.mutation({
            query: (credentials) => ({ url: '/login', method: 'POST', body: credentials }),
        }),
    }),
});

export const {
    useCeoLoginMutation,
    useDirectorLoginMutation,
    useParentLoginMutation
} = authApi;