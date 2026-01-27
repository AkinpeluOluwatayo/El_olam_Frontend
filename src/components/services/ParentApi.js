import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const parentApi = createApi({
    reducerPath: 'parentApi',
    baseQuery: fetchBaseQuery({

        baseUrl: 'http://localhost:8080/el_olam',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.userInfo?.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ['Child', 'Report', 'Media', 'LatestReport'],
    endpoints: (builder) => ({
        getParentChildProfile: builder.query({
            query: (childId) => `/children/${childId}`,
            providesTags: ['Child'],
        }),

        getParentChildReports: builder.query({
            query: (childId) => `/reports/child/${childId}`,
            providesTags: ['Report'],
        }),

        getLatestChildReport: builder.query({
            query: (childId) => `/reports/child/${childId}/latest`,
            providesTags: ['LatestReport', 'Report'],
        }),

        getParentChildMedia: builder.query({
            query: (childId) => `/media/child/${childId}`,
            providesTags: ['Media'],
        }),
    }),
});

export const {
    useGetParentChildProfileQuery,
    useGetParentChildReportsQuery,
    useGetLatestChildReportQuery,
    useGetParentChildMediaQuery,
} = parentApi;