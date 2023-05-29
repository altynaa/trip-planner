import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CountriesResponse, CountryAndCity } from "../../../types";


export const fetchCountriesAndCities = createAsyncThunk<CountryAndCity[]>(
  'countries/getCountriesAndCities',
  async () => {
    const response = await axios.get(`https://countriesnow.space/api/v0.1/countries`);
    const countries: CountriesResponse[] = response.data.data;
    return countries.map(obj => {
      return {
        country: obj.country,
        cities: obj.cities,
      }
    });
  }
)
