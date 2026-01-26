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
    // Sync with CEO: 'Children' and 'Users' (Plural)
    tagTypes: ['Children', 'Users', 'Report', 'Media', 'Inventory', 'LatestReport'],
    endpoints: (builder) => ({
        // --- Child Management ---
        enrollChild: builder.mutation({
            query: (data) => ({ url: '/children/enroll', method: 'POST', body: data }),
            invalidatesTags: ['Children'],
        }),
        getAllChildren: builder.query({
            query: () => '/children/all',
            providesTags: ['Children'],
        }),
        updateChild: builder.mutation({
            query: ({ childId, ...data }) => ({
                url: `/children/update/${childId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Children'],
        }),
        removeChild: builder.mutation({
            query: (id) => ({ url: `/children/remove/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Children'],
        }),

        // --- Parent Onboarding ---
        onboardParent: builder.mutation({
            query: ({ childId, ...data }) => ({
                url: `/auth/onboard-parent/${childId}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users', 'Children'], // Updates both staff list and child record
        }),

        // --- Reports & Media ---
        addReport: builder.mutation({
            query: (data) => ({ url: '/reports/create', method: 'POST', body: data }),
            invalidatesTags: ['Report', 'LatestReport'],
        }),
        getChildReports: builder.query({
            query: (childId) => `/reports/child/${childId}`,
            providesTags: ['Report'],
        }),
        uploadMedia: builder.mutation({
            query: (formData) => ({
                url: '/media/upload',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Media', 'LatestReport'],
        }),
        getChildMedia: builder.query({
            query: (childId) => `/media/child/${childId}`,
            providesTags: ['Media'],
        }),
        deleteMedia: builder.mutation({
            query: (mediaId) => ({ url: `/media/delete/${mediaId}`, method: 'DELETE' }),
            invalidatesTags: ['Media'],
        }),

        // --- Inventory Management ---
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
        removeInventory: builder.mutation({
            query: (itemId) => ({
                url: `/inventory/delete/${itemId}`,
                method: 'DELETE'
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
    useUpdateStockMutation,
    useRemoveInventoryMutation
} = directorApi;