import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/el_olam/auth',
    }),
    endpoints: (builder) => ({
        ceoLogin: builder.mutation({
            query: (credentials) => ({ url: '/login/ceo', method: 'POST', body: credentials }),
        }),
        directorLogin: builder.mutation({
            query: (credentials) => ({ url: '/login/director', method: 'POST', body: credentials }),
        }),

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