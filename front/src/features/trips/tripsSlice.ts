import { Coordinates, Destination, Trip, ValidationError } from "../../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTrip, deleteTrip, fetchCoordinatesOfCities, fetchTrips } from "@/features/trips/tripsThunks";
import { RootState } from "@/app/store";

interface TripsState {
  trips: Trip[];
  tripsLoading: boolean;
  tripAdding: boolean;
  tripAddError: ValidationError | null;
  tripDeleting: boolean;
  coordinatesLoading: boolean;
  coordinates: Coordinates [];
}

const initialState: TripsState = {
  trips: [],
  tripsLoading: false,
  tripAdding: false,
  tripAddError: null,
  tripDeleting: false,
  coordinatesLoading: false,
  coordinates: [],
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    deleteCoordinates: (state, action: PayloadAction<{ trips: Destination[] }>) => {
      const { trips } = action.payload;
      const { coordinates } = state;
      const newCoordinates = coordinates.filter(coordinate => {
        return trips.some(trip => trip.city === coordinate.city);
      });
      return {
        ...state,
        coordinates: newCoordinates,
      };

    },
  },
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
      state.coordinates = [];
    });
    builder.addCase(addTrip.rejected, (state, {payload: error}) => {
      state.tripAdding = false;
      state.tripAddError = error || null;
    });

    builder.addCase(deleteTrip.pending, (state) => {
      state.tripDeleting = true;
    });
    builder.addCase(deleteTrip.fulfilled, (state) => {
      state.tripDeleting = false;
    });
    builder.addCase(deleteTrip.rejected, (state) => {
      state.tripDeleting = false;
    });

    builder.addCase(fetchCoordinatesOfCities.pending, (state) => {
      state.coordinatesLoading = true;
    });
    builder.addCase(fetchCoordinatesOfCities.fulfilled, (state, {payload: coordinates}) => {
      state.coordinatesLoading = false;
      state.coordinates = [...state.coordinates, coordinates];
    });
    builder.addCase(fetchCoordinatesOfCities.rejected, (state) => {
      state.coordinatesLoading = false;
    });
  }
});
export const tripsReducer = tripsSlice.reducer;
export const { deleteCoordinates }  = tripsSlice.actions;

export const selectTripAdding = (state: RootState) => state.trips.tripAdding;
export const selectTrips = (state: RootState) => state.trips.trips;
export const selectTripsLoading = (state: RootState) => state.trips.tripsLoading;
export const selectTripDeleting = (state: RootState) => state.trips.tripDeleting;
export const selectCoordinates = (state: RootState) => state.trips.coordinates;