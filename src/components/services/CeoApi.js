import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ceoApi = createApi({
    reducerPath: 'ceoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/el_olam',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.userInfo?.token;
            if (token) headers.set('authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Users', 'Children'],
    endpoints: (builder) => ({
        getGlobalUsers: builder.query({
            query: () => '/users/all',
            providesTags: ['Users'],
        }),
        searchUserByEmail: builder.query({
            query: (email) => `/users/search?email=${encodeURIComponent(email)}`,
            providesTags: ['Users'],
        }),
        getGlobalChildren: builder.query({
            query: () => '/children/all',
            providesTags: ['Children'],
        }),
        getChildById: builder.query({
            query: (childId) => `/children/${childId}`,
            providesTags: ['Children'],
        }),
        getParentByChild: builder.query({
            query: (childId) => `/users/parent-of/${childId}`,
            providesTags: ['Users'],
        }),
        // NEW: Global User Deletion
        removeUser: builder.mutation({
            query: (userId) => ({
                url: `/users/remove/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const {
    useGetGlobalUsersQuery,
    useSearchUserByEmailQuery,
    useGetGlobalChildrenQuery,
    useGetChildByIdQuery,
    useGetParentByChildQuery,
    useRemoveUserMutation
} = ceoApi;