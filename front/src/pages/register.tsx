import React, { useState } from "react";
import { Avatar, Box, Button, CircularProgress, Container, Grid, Modal, TextField, Typography } from "@mui/material";
import { RegisterMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { googleLogin, register } from "@/features/users/usersThunks";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  selectModalWindowStatus,
  selectRegisterError,
  selectRegisterLoading,
  switchModalWindow
} from "@/features/users/usersSlice";
import Home from "@/pages/index";
import { useGoogleLogin } from "@react-oauth/google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const modalWindowStatus = useAppSelector(selectModalWindowStatus);
  const error = useAppSelector(selectRegisterError);
  const registering = useAppSelector(selectRegisterLoading);
  const [state, setState] = useState<RegisterMutation>({
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  });

  const closeRegistrationModalWindow = async () => {
    await dispatch(switchModalWindow());
    await router.push("/");
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState => ({ ...prevState, [name]: value })));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      await router.push("/");
    } catch (e) {
      throw new Error();
    }
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await dispatch(googleLogin(tokenResponse.access_token)).unwrap();
      await router.push("/");
    }
  });

  const getFieldError = (fieldname: string) => {
    try {
      return error?.errors[fieldname].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Home>
      <Modal
        open={modalWindowStatus}
        onClose={closeRegistrationModalWindow}
      >
        <Container style={{
          backgroundColor: "#F5F5F5",
          borderRadius: "5%"
        }}
                   component="main" maxWidth="xs"
        >
          <Box
            style={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    autoComplete="new-email"
                    required
                    value={state.email}
                    onChange={inputChangeHandler}
                    error={Boolean(getFieldError("email"))}
                    helperText={getFieldError("email")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="First name"
                    name="firstName"
                    autoComplete="new-firstName"
                    required
                    value={state.firstName}
                    onChange={inputChangeHandler}
                    error={Boolean(getFieldError("firstName"))}
                    helperText={getFieldError("firstName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Last name"
                    name="lastName"
                    autoComplete="new-lastName"
                    required
                    value={state.lastName}
                    onChange={inputChangeHandler}
                    error={Boolean(getFieldError("lastName"))}
                    helperText={getFieldError("lastName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    autoComplete="new-password"
                    type="password"
                    required
                    value={state.password}
                    onChange={inputChangeHandler}
                    error={Boolean(getFieldError("password"))}
                    helperText={getFieldError("password")}
                  />
                </Grid>
                {/*<Grid item xs={12}>*/}
                {/*  <FileInput onChange={inputFileHandler} label="image" name="image"/>*/}
                {/*</Grid>*/}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                disabled={registering || !state.email || !state.firstName || !state.lastName || !state.password}
              >
                {registering ? (<Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>) : "Sign up"}
              </Button>
              <Grid item xs={12}>
                <Button onClick={() => googleLoginHandler()}>
                  Google
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Link href={`/login`}>
                  Already have an account? Sign in!
                </Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Modal>
    </Home>
  );
};

export default Register;