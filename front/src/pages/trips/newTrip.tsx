import React from "react";
import TripForm from "@/components/UI/Trip/TripForm";
import { Container, Grid } from "@mui/material";
import Map from "@/components/Map";

const NewTrip = () => {
  return (
    <Container maxWidth="xl" style={{marginTop: 25}}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TripForm/>
        </Grid>
        <Grid item xs={6}>
          <Map/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewTrip;