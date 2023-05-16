import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { COUNTRY_API } from "../../../constants";
import { Country } from "../../../types";

export const fetchCountries = createAsyncThunk<Country[]>(
  "countries/getAll",
  async () => {
    const response = await axios.get<Country[]>(`https://countryapi.io/api/all?apikey=${COUNTRY_API}`);
    const countries = Object.values(response.data);
    return countries.map(country => {
      return {
        name: country.name,
        capital: country.capital
      }
    });
  }
);
