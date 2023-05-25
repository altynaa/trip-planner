import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CountriesResponse, Country, CountryNameToSend } from "../../../types";

export const fetchCountries = createAsyncThunk<Country[]>(
  "countries/getAll",
  async () => {
    const response = await axios.get(`https://countriesnow.space/api/v0.1/countries`);
    const countries: CountriesResponse[] = response.data.data;
    return countries.map(obj => {
      return {
        name: obj.country,
      }
    });
  }
);

export const fetchCitiesOfCountry = createAsyncThunk<string[], CountryNameToSend>(
  'countries/getSpecificCities',
  async (countryName) => {
    const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', countryName);
    return response.data.data;
  }
);
