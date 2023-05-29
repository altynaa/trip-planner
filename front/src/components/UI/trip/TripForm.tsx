import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCountriesAndCities } from "@/features/countries/countriesSlice";
import { fetchCountriesAndCities } from "@/features/countries/countriesThunks";
import { addTrip } from "@/features/trips/tripsThunks";
import { selectTripAdding } from "@/features/trips/tripsSlice";
import { Destination, TripDate } from "../../../../types";
import { Grid, Typography, Button, CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TripForm = () => {
  const dispatch = useAppDispatch();
  const countriesAndCities = useAppSelector(selectCountriesAndCities);
  const adding = useAppSelector(selectTripAdding);
  const [trips, setTrips] = useState<Destination[]>([{ country: "", city: "" }]);
  const [date, setDate] = useState<TripDate>({ startsAt: null, finishesAt: null });


  useEffect(() => {
    dispatch(fetchCountriesAndCities());
  }, [dispatch, trips]);


  const inputChangeHandler = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedTrips = [...trips];
    updatedTrips[index] = {
      ...updatedTrips[index],
      [name]: value
    };
    setTrips(updatedTrips);
  };

  const handleStartDateChange = (date: Date | null) => {
    setDate((prevDate) => ({
      ...prevDate,
      startsAt: date
    }));
  };

  const handleEndDateChange = (date: Date | null) => {
    setDate((prevDate) => ({
      ...prevDate,
      finishesAt: date
    }));
  };

  const handleAddRow = () => {
    setTrips(prevTrips => [...prevTrips, { country: "", city: "" }]);
  };

  const handleDeleteRow = (index: number) => {
    if (trips.length === 1) {
      return;
    } else {
      setTrips(prevTrips => {
        const updatedTrips = [...prevTrips];
        updatedTrips.splice(index, 1);
        return updatedTrips;
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trip = {
      itinerary: trips,
      startsAt: date.startsAt,
      finishesAt: date.finishesAt
    };
    await dispatch(addTrip(trip));
  };

  return (
    <>
      <Typography>Set your trip details</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Button
              type="button"
              onClick={() => handleAddRow()}
            >
              Add row
            </Button>
          </Grid>
          {trips.map((trip, index) => (
            <Grid item xs={12} key={index}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={4}>
                  <label
                    htmlFor={`country${index}`}
                    className="mb-2"
                    style={{
                      display: "block",
                      marginBottom: 5
                    }}
                  >
                    Countries
                  </label>
                  <select
                    id={`country${index}`}
                    name="country"
                    className="form-control"
                    required
                    value={trip.country}
                    onChange={(e) => inputChangeHandler(index, e)}
                    style={{ width: 350 }}
                  >
                    <option disabled value="">Choose country</option>
                    {countriesAndCities.map(obj => (
                      <option
                        key={Math.random()}
                        value={obj.country}>
                        {obj.country}
                      </option>
                    ))}
                  </select>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label
                    htmlFor={`city${index}`}
                    className="mb-2"
                    style={{
                      display: "block",
                      marginBottom: 5
                    }}
                  >
                    Cities
                  </label>
                  <select
                    id={`city${index}`}
                    name="city"
                    className="form-control"
                    required
                    value={trip.city}
                    onChange={(e) => inputChangeHandler(index, e)}
                    style={{ width: 350 }}
                  >
                    <option disabled value="">Choose city</option>
                    {countriesAndCities.map(obj => {
                      if (obj.country === trip.country) {
                        return obj.cities.map(city => (
                          <option
                            key={Math.random()}
                            value={city}>
                            {city}
                          </option>
                        ));
                      }
                    })}
                  </select>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    type="button"
                    disabled={trips.length === 1}
                    onClick={() => handleDeleteRow(index)}
                  >
                    Delete middle point
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Trip start date"
                value={date.startsAt}
                onChange={handleStartDateChange}
                sx={{ width: 350 }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Trip end date"
                value={date.finishesAt}
                onChange={handleEndDateChange}
                sx={{ width: 350 }}
              />
            </LocalizationProvider>
          </Grid>


          <Grid item xs={12}>
            <Button
              disabled={adding || trips.some(trip => !trip.country || !trip.city) || !date.startsAt || !date.finishesAt}
              type="submit"
            >
              {adding && <CircularProgress />}
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default TripForm;