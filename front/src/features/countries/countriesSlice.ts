import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries } from "@/features/countries/countriesThunks";
import { RootState } from "@/app/store";
import { Country } from "../../../types";

interface CountriesState {
  countries: Country[],
  countriesLoading: boolean
}

const initialState: CountriesState = {
  countries: [],
  countriesLoading: false
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.countriesLoading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countriesLoading = false;
      state.countries = action.payload;
    });
    builder.addCase(fetchCountries.rejected, (state) => {
      state.countriesLoading = true;
    });
  }
});

export const countriesReducer = countriesSlice.reducer;

export const selectCountries = (state: RootState) => state.countries.countries;

