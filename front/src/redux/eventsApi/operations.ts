import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IEvents,
  IGetEventsResponse,
  IGetParticipantsResponse,
  IParticipant,
  ISetParticipantData,
  ISetParticipantResponse
} from "../types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Events"],
  endpoints: (build) => ({
    // get all events
    getEvents: build.query<IGetEventsResponse<IEvents>, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 10 }) => `api/events/?page=${page}&pageSize=${pageSize}`,
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
      },
      keepUnusedDataFor: 120
    }),
    registerIn: build.mutation<ISetParticipantResponse, ISetParticipantData>({
      query: (params) => ({
        url: `api/events/registration`,
        method: "POST",
        body: params
      })
    }),
    // get all participants
    getParticipants: build.query<IGetParticipantsResponse<IParticipant>, string>({
      query: (id: string) => ({
        url: `api/events/participants?id=${id}`
      }),
      keepUnusedDataFor: 5
    })
  })
});

export const { useGetEventsQuery, useGetParticipantsQuery, useRegisterInMutation } = api;
