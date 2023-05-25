import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCities, selectCountries } from "@/features/countries/countriesSlice";
import { fetchCitiesOfCountry, fetchCountries } from "@/features/countries/countriesThunks";
import { Grid, Typography, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TripMutation } from "../../../../types";
import { addTrip } from "@/features/trips/tripsThunks";

const TripForm = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const cities = useAppSelector(selectCities);
  const [state, setState] = useState<TripMutation>({
    country: '',
    city: '',
    itinerary: [],
    startsAt: null,
    finishesAt: null,
  });

  useEffect(() => {
    dispatch(fetchCountries());
    if (state.country) {
      dispatch(fetchCitiesOfCountry({country: state.country}));
    }
  }, [dispatch, state.country]);


  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const handleStartDateChange = (date: Date | null) => {
    setState({
      ...state,
      startsAt: date
    });
  };
  const handleEndDateChange = (date: Date | null) => {
    setState({
      ...state,
      finishesAt: date
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(addTrip({
      itinerary: [{country: state.country, city: state.city}],
      startsAt: state.startsAt,
      finishesAt: state.finishesAt
    }))
  };

  return (
    <>
      <Typography>Set your trip details</Typography>
      <form
        onSubmit={handleSubmit}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <label
              htmlFor="country"
              className="mb-2"
              style={{
                display: "block",
                marginBottom: 5
              }}
            >
              Countries
            </label>
            <select
              id="country"
              name="country"
              className="form-control"
              required
              value={state.country}
              onChange={inputChangeHandler}
              style={{width: 350}}
            >
              <option disabled value="">Choose country</option>
              {countries.map(country => (
                <option
                  key={Math.random()}
                  // id={country.id.toString()}
                  value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </Grid> <Grid item xs={12}>
          <label
            htmlFor="city"
            className="mb-2"
            style={{
              display: "block",
              marginBottom: 5
            }}
          >
            Cities
          </label>
          <select
            id="city"
            name="city"
            className="form-control"
            required
            value={state.city}
            onChange={inputChangeHandler}
            style={{width: 350}}
          >
            <option disabled value="">Choose city</option>
            {cities.map(city => (
              <option
                key={Math.random()}
                // id={country.id.toString()}
                value={city}>
                {city}
              </option>
            ))}
          </select>
        </Grid>

          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Trip start date"
                value={state.startsAt}
                onChange={handleStartDateChange}
                sx={{width: 350}}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Trip end date"
                value={state.finishesAt}
                onChange={handleEndDateChange}
                sx={{width: 350}}
              />
            </LocalizationProvider>
          </Grid>


          <Grid item xs={12}>
            <Button
              // disabled={adding || !state.tutor || !state.category || !state.title || !state.description || !state.duration || !state.price || !date}
              type="submit"
            >
              {/*{adding && <CircularProgress/>}*/}
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default TripForm;