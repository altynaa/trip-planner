import { createSlice } from "@reduxjs/toolkit";
import { fetchCitiesOfCountry, fetchCountries } from "@/features/countries/countriesThunks";
import { RootState } from "@/app/store";
import { Country } from "../../../types";

interface CountriesState {
  countries: Country[],
  countriesLoading: boolean,
  citiesLoading: boolean,
  cities: string[]
}

const initialState: CountriesState = {
  countries: [],
  countriesLoading: false,
  citiesLoading: false,
  cities: []
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.countriesLoading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, {payload: country}) => {
      state.countriesLoading = false;
      state.countries = country;
    });
    builder.addCase(fetchCountries.rejected, (state) => {
      state.countriesLoading = false;
    });

    builder.addCase(fetchCitiesOfCountry.pending, (state) => {
      state.citiesLoading = true;
    });
    builder.addCase(fetchCitiesOfCountry.fulfilled, (state, {payload: cities}) => {
      state.citiesLoading = false;
      state.cities = cities;
    });
    builder.addCase(fetchCitiesOfCountry.rejected, (state) => {
      state.citiesLoading = false;
    });
  }
});

export const countriesReducer = countriesSlice.reducer;

export const selectCountries = (state: RootState) => state.countries.countries;
export const selectCities = (state: RootState) => state.countries.cities;

