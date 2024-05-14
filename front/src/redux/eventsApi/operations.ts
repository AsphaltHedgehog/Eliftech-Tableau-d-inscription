import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEvents, IGetEventsResponse } from "../types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Events"],
  endpoints: (build) => ({
    getEvents: build.query<IGetEventsResponse<IEvents>, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 6 }) => `api/events/?page=${page}&pageSize=${pageSize}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        const { page } = arg;

        if (page === 1) {
          return newItems;
        }

        const updatedData = [...currentCache.data, ...newItems.data];

        return {
          data: updatedData,
          totalEvents: currentCache.totalEvents
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    })
  })
});

export const { useGetEventsQuery } = api;
