import { createAsyncThunk } from "@reduxjs/toolkit";
import { Trip, TripApi,  ValidationError } from "../../../types";
import axiosApi from "../../../axiosApi";
import { isAxiosError } from "axios";

export const fetchTrips = createAsyncThunk<Trip[]>(
  "trips/fetchAll",
  async () => {
    const response = await axiosApi.get<Trip[]>('/trips');
    return response.data;
  }
);

export const addTrip = createAsyncThunk<void, TripApi, {rejectValue: ValidationError}>(
  "trips/add",
  async (trip, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/trips', trip);
      return response.data;
    }  catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);