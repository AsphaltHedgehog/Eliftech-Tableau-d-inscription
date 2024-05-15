import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEvents, IGetEventsResponse, IGetParticipantsResponse, IParticipant, ISetParticipantResponse } from "../types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Events"],
  endpoints: (build) => ({
    // get all events
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
      },
      keepUnusedDataFor: 120
    }),
    setParticipant: build.query<
      ISetParticipantResponse,
      { id: string; name: string; email: string; dateOfBirth: string; heardAbout: string }
    >({
      query: ({ id, name, email, dateOfBirth, heardAbout }) => ({
        url: `api/events/registration`,
        body: {
          event: id,
          name,
          email,
          dateOfBirth,
          heardAbout
        }
      }),
      keepUnusedDataFor: 1
    }),
    // get all participants
    getParticipants: build.query<IGetParticipantsResponse<IParticipant>, string>({
      query: (id: string) => ({
        url: `api/events/participants`,
        body: { event: id }
      }),
      keepUnusedDataFor: 120
    })
  })
});

export const { useGetEventsQuery, useGetParticipantsQuery, useSetParticipantQuery } = api;
