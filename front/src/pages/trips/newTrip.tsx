import React from "react";
import TripForm from "@/components/UI/trip/TripForm";
import { Grid } from "@mui/material";
import Map from "@/components/Map";

const NewTrip = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TripForm/>
        </Grid>
        <Grid item xs={6}>
          <Map/>
        </Grid>
      </Grid>
    </>
  );
};

export default NewTrip;