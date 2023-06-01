import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { deleteTrip, fetchTrips } from "@/features/trips/tripsThunks";
import { selectTripDeleting, selectTrips, selectTripsLoading } from "@/features/trips/tripsSlice";
import { selectUser } from "@/features/users/usersSlice";
import {
  Box, Button,
  CircularProgress, Container,
  Grid,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

const MyTrips = () => {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(selectTrips);
  const tripsLoading = useAppSelector(selectTripsLoading);
  const user = useAppSelector(selectUser);
  const deleting = useAppSelector(selectTripDeleting);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);


  const handleDelete = async (tripId: string) => {
    await dispatch(deleteTrip(tripId));
    await dispatch(fetchTrips());
  };

  return (
    <Container maxWidth="xl">
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">
              Your trips
            </Typography>
          </Grid>
        </Grid>
        {tripsLoading ?
          <Box sx={{display: 'flex'}}> <CircularProgress/> </Box>
          :
          <Grid item container spacing={2}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Itinerary</TableCell>
                    <TableCell align="left">Start Date</TableCell>
                    <TableCell align="left">End Date</TableCell>
                    <TableCell align="left">Flight Booking</TableCell>
                    {user && <TableCell align="center">Delete</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trips.map((trip) => (
                    <TableRow
                      key={trip.id}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell align="left">
                        {trip.itinerary.map((point) => (
                          <>
                            <Typography>Country: {point.country}</Typography>
                            <Typography>City: {point.city}</Typography>
                          </>
                        ))}
                      </TableCell>
                      <TableCell align="left">{dayjs(trip.startsAt.toString()).format("DD.MM.YYYY")}</TableCell>
                      <TableCell align="left">{dayjs(trip.finishesAt.toString()).format("DD.MM.YYYY")}</TableCell>
                      <TableCell align="left">
                        {trip.flightBooking && (
                          <a href={trip.flightBooking} download>
                            Download File
                          </a>
                        )}
                      </TableCell>
                      {user &&
                        <TableCell align="center">
                          <Button variant="contained"
                                  onClick={() => handleDelete(trip.id.toString())}
                                  disabled={deleting}
                          >
                            {deleting ?
                              <Box sx={{display: "flex"}}>
                                <CircularProgress/>
                              </Box> : <DeleteIcon/>
                            }
                          </Button>
                        </TableCell>
                      }
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>}
      </Grid>
    </Container>

  );
};

export default MyTrips;