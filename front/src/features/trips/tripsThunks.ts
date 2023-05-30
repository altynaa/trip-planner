import { createAsyncThunk } from "@reduxjs/toolkit";
import { Trip, TripApi, ValidationError } from "../../../types";
import axiosApi from "../../../axiosApi";
import { isAxiosError } from "axios";

export const fetchTrips = createAsyncThunk<Trip[]>(
  "trips/fetchAll",
  async () => {
    const response = await axiosApi.get<Trip[]>("/trips");
    return response.data;
  }
);

export const addTrip = createAsyncThunk<void, TripApi, { rejectValue: ValidationError }>(
  "trips/add",
  async (trip, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(trip) as (keyof TripApi)[];

      keys.forEach(key => {
        const value = trip[key];

        if (value != null) {
          if (key === "itinerary" && Array.isArray(value)) {
            const itineraryString = JSON.stringify(value);
            formData.append(key, itineraryString);
          } else if (value instanceof File) {
            formData.append(key, value);
          } else if (key === "startsAt" || key === "finishesAt") {
            const dateValue = value as Date;
            const isoString = dateValue.toISOString();
            formData.append(key, isoString);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      const response = await axiosApi.post("/trips", formData);
      return response.data;

    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);