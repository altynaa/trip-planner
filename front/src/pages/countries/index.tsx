import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCountries } from "@/features/countries/countriesSlice";
import { fetchCountries } from "@/features/countries/countriesThunks";

const Countries = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);


  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  console.log(countries);

  return (
    <div>
      list of countries
    </div>
  );
};

export default Countries;