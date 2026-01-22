import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const directorApi = createApi({
    reducerPath: 'directorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/el_olam',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.userInfo?.token;
            if (token) headers.set('authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Child', 'User', 'Report', 'Media', 'Inventory'],
    endpoints: (builder) => ({
        enrollChild: builder.mutation({
            query: (data) => ({ url: '/children/enroll', method: 'POST', body: data }),
            invalidatesTags: ['Child'],
        }),
        getAllChildren: builder.query({
            query: () => '/children/all',
            providesTags: ['Child'],
        }),
        updateChild: builder.mutation({
            query: ({ childId, ...data }) => ({
                url: `/children/update/${childId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Child'],
        }),
        removeChild: builder.mutation({
            query: (id) => ({ url: `/children/remove/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Child'],
        }),
        onboardParent: builder.mutation({
            query: ({ childId, ...data }) => ({
                url: `/auth/onboard-parent/${childId}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User', 'Child'],
        }),
        addReport: builder.mutation({
            query: (data) => ({ url: '/reports/create', method: 'POST', body: data }),
            invalidatesTags: ['Report'],
        }),
        getChildReports: builder.query({
            query: (childId) => `/reports/child/${childId}`,
            providesTags: ['Report'],
        }),
        uploadMedia: builder.mutation({
            query: (data) => ({ url: '/media/upload', method: 'POST', body: data }),
            invalidatesTags: ['Media'],
        }),
        getChildMedia: builder.query({
            query: (childId) => `/media/child/${childId}`,
            providesTags: ['Media'],
        }),
        deleteMedia: builder.mutation({
            query: (mediaId) => ({ url: `/media/delete/${mediaId}`, method: 'DELETE' }),
            invalidatesTags: ['Media'],
        }),
        getInventory: builder.query({
            query: () => '/inventory/all',
            providesTags: ['Inventory'],
        }),
        addInventory: builder.mutation({
            query: (data) => ({ url: '/inventory/add', method: 'POST', body: data }),
            invalidatesTags: ['Inventory'],
        }),
        updateStock: builder.mutation({
            query: ({ itemId, quantity }) => ({
                url: `/inventory/update-stock/${itemId}`,
                method: 'PATCH',
                params: { quantity }
            }),
            invalidatesTags: ['Inventory'],
        }),
    }),
});

export const {
    useEnrollChildMutation,
    useGetAllChildrenQuery,
    useUpdateChildMutation,
    useRemoveChildMutation,
    useOnboardParentMutation,
    useAddReportMutation,
    useGetChildReportsQuery,
    useUploadMediaMutation,
    useGetChildMediaQuery,
    useDeleteMediaMutation,
    useGetInventoryQuery,
    useAddInventoryMutation,
    useUpdateStockMutation
} = directorApi;