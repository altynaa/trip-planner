import { createSlice } from "@reduxjs/toolkit";
import { fetchCountriesAndCities } from "@/features/countries/countriesThunks";
import { RootState } from "@/app/store";
import { CountryAndCity } from "../../../types";

interface CountriesState {
  countriesAndCities: CountryAndCity[],
  countriesAndCitiesLoading: boolean,
}

const initialState: CountriesState = {
  countriesAndCities: [],
  countriesAndCitiesLoading: false
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountriesAndCities.pending, (state) => {
      state.countriesAndCitiesLoading = true;
    });
    builder.addCase(fetchCountriesAndCities.fulfilled, (state, {payload: countryData}) => {
     state.countriesAndCitiesLoading = false;
     state.countriesAndCities = countryData;
    });
    builder.addCase(fetchCountriesAndCities.rejected, (state) => {
      state.countriesAndCitiesLoading = false;
    });
  }
});

export const countriesReducer = countriesSlice.reducer;

export const selectCountriesAndCities = (state: RootState) => state.countries.countriesAndCities;
export const selectCountriesAndCitiesLoading = (state: RootState) => state.countries.countriesAndCitiesLoading;

