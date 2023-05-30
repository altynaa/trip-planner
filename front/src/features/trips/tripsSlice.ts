import { Trip, ValidationError } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import { addTrip, fetchTrips } from "@/features/trips/tripsThunks";
import { RootState } from "@/app/store";

interface TripsState {
  trips: Trip[];
  tripsLoading: boolean;
  tripAdding: boolean;
  tripAddError: ValidationError | null;
}

const initialState: TripsState = {
  trips: [],
  tripsLoading: false,
  tripAdding: false,
  tripAddError: null,
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrips.pending, (state) => {
      state.tripsLoading = true;
    });
    builder.addCase(fetchTrips.fulfilled, (state, {payload: trips}) => {
      state.tripsLoading = false;
      state.trips = trips;
    });
    builder.addCase(fetchTrips.rejected, (state) => {
      state.tripsLoading = false;
    });

    builder.addCase(addTrip.pending, (state) => {
      state.tripAdding = true;
    });
    builder.addCase(addTrip.fulfilled, (state) => {
      state.tripAdding = false;
      state.tripAddError = null;
    });
    builder.addCase(addTrip.rejected, (state, {payload: error}) => {
      state.tripAdding = false;
      state.tripAddError = error || null;
    });
  }
});

export const tripsReducer = tripsSlice.reducer;

export const selectTripAdding = (state: RootState) => state.trips.tripAdding;
export const selectTrips = (state: RootState) => state.trips.trips;
export const selectTripsLoading = (state: RootState) => state.trips.tripsLoading;