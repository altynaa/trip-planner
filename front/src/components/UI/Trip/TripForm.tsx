import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectCountriesAndCities} from "@/features/countries/countriesSlice";
import {fetchCountriesAndCities} from "@/features/countries/countriesThunks";
import {addTrip, fetchCoordinatesOfCities} from "@/features/trips/tripsThunks";
import {deleteCoordinates, selectCoordinates, selectTripAdding} from "@/features/trips/tripsSlice";
import FileInput from '@/components/UI/FileInput/FileInput';
import {Destination, TripData} from "../../../../types";
import {Grid, Typography, Button, CircularProgress, Box} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useRouter} from "next/router";

const TripForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const countriesAndCities = useAppSelector(selectCountriesAndCities);
    const adding = useAppSelector(selectTripAdding);
    const coordinates = useAppSelector(selectCoordinates);
    const [trips, setTrips] = useState<Destination[]>([{country: "", city: ""}]);
    const [prevTripsLength, setPrevTripsLength] = useState<number>(trips.length);
    const [tripData, setTripData] = useState<TripData>({
        startsAt: null,
        finishesAt: null,
        flightBooking: null
    });

    useEffect(() => {
        dispatch(fetchCountriesAndCities());
    }, [dispatch]);


    useEffect(() => {
        dispatch(fetchCountriesAndCities());

        const lastTrip = trips[trips.length - 1];
        const lastTripCity = lastTrip.city;

        const isNewTrip = trips.length > prevTripsLength;
        const cityExistsInCoordinates = coordinates.some((coord) => coord.city === lastTripCity);

        if (lastTripCity !== "") {
            if (isNewTrip || (!isNewTrip && !cityExistsInCoordinates)) {
                dispatch(fetchCoordinatesOfCities(lastTripCity));
            }
        }

    }, [dispatch, trips, coordinates, prevTripsLength]);


    useEffect(() => {
        if (trips.length <= prevTripsLength) {
            dispatch(deleteCoordinates({trips}));
        }
        setPrevTripsLength(trips.length);
    }, [dispatch, trips, prevTripsLength]);


    const inputChangeHandler = async (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        const updatedTrips = [...trips];
        updatedTrips[index] = {
            ...updatedTrips[index],
            [name]: value
        };
        await setTrips(updatedTrips);
    };

    const handleStartDateChange = (date: Date | null) => {
        setTripData((prevDate) => ({
            ...prevDate,
            startsAt: date
        }));
    };

    const handleEndDateChange = (date: Date | null) => {
        setTripData((prevDate) => ({
            ...prevDate,
            finishesAt: date
        }));
    };

    const inputFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setTripData(prev => ({
            ...prev, [name]: files && files[0] ? files[0] : null
        }));
    };

    const handleAddRow = () => {
        setTrips(prevTrips => [...prevTrips, {country: "", city: ""}]);
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
            startsAt: tripData.startsAt,
            finishesAt: tripData.finishesAt,
            flightBooking: tripData.flightBooking
        };
        await dispatch(addTrip(trip));
        await router.push('/trips/myTrips');
        setTrips([{country: "", city: ""}]);
    };

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="center" marginBottom={2}>
                <Typography> Set your trip details </Typography>
            </Box>
            <form onSubmit={handleSubmit}>

                {trips.map((trip, index) => (
                    <Grid item xs={12} key={index}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12}>
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
                                    style={{width: 350}}
                                >
                                    <option disabled value="">Choose country</option>
                                    {countriesAndCities.map(obj => (
                                        <option
                                            key={crypto.randomUUID()}
                                            value={obj.country}>
                                            {obj.country}
                                        </option>
                                    ))}
                                </select>
                            </Grid>
                            <Grid item xs={12}>
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
                                    style={{width: 350}}
                                >
                                    <option disabled value="">Choose city</option>
                                    {countriesAndCities.map(obj => {
                                        if (obj.country === trip.country) {
                                            return obj.cities.map(city => (
                                                <option
                                                    key={crypto.randomUUID()}
                                                    value={city}>
                                                    {city}
                                                </option>
                                            ));
                                        }
                                    })}
                                </select>
                            </Grid>

                            <Grid item xs={12} >
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
                <Grid container direction="column" spacing={2}>
                    <Grid item xs={12} marginBottom={2}>
                        <Button
                            type="button"
                            onClick={() => handleAddRow()}
                        >
                            Add row
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Attach your ticket or booking of tickets</Typography>
                        <FileInput
                            onChange={inputFileChangeHandler}
                            name="flightBooking"
                            label="Flight Booking"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Trip start date"
                                value={tripData.startsAt}
                                onChange={handleStartDateChange}
                                sx={{width: 350}}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Trip end date"
                                value={tripData.finishesAt}
                                onChange={handleEndDateChange}
                                sx={{width: 350}}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            disabled={adding || trips.some(trip => !trip.country || !trip.city) || !tripData.startsAt || !tripData.finishesAt}
                            type="submit"
                        >
                            {adding && <CircularProgress/>}
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};


export default TripForm;