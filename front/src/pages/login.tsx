import React, { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import Home from "@/pages/index";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  selectLoginError,
  selectLoginLoading,
  selectModalWindowStatus,
  switchModalWindow
} from "@/features/users/usersSlice";
import { useRouter } from "next/router";
import { LoginMutation } from "../../types";
import { googleLogin, login } from "@/features/users/usersThunks";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Link from "next/link";


const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const modalWindowStatus = useAppSelector(selectModalWindowStatus);
  const error = useAppSelector(selectLoginError);
  const logining = useAppSelector(selectLoginLoading);
  const [state, setState] = useState<LoginMutation>({
    email: "",
    password: ""
  });

  const closeAuthorizationModalWindow = async () => {
    await dispatch(switchModalWindow());
    await router.push("/");
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState => ({ ...prevState, [name]: value })));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    await router.push("/");
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await dispatch(googleLogin(tokenResponse.access_token)).unwrap();
      await router.push("/");
    }
  });
  // const googleLoginHandler = async (credentials: string) => {
  //   await dispatch(googleLogin(credentials)).unwrap();
  //   await router.push("/");
  // };

  return (
    <Home>
      <Modal
        open={modalWindowStatus}
        onClose={closeAuthorizationModalWindow}
      >
        <Container style={{
          backgroundColor: "#F5F5F5",
          borderRadius: "5%"
        }}
                   component="main" maxWidth="xs"
        >
          <Box
            style={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ pt: 2 }}>
              {/*<GoogleLogin onSuccess={(credentialResponse) => {*/}
              {/*  if (credentialResponse.credential) {*/}
              {/*    googleLoginHandler(credentialResponse.credential);*/}
              {/*  }*/}
              {/*}}*/}
              {/*             onError={() => {*/}
              {/*               console.log("Login failed");*/}
              {/*             }}*/}
              {/*/>*/}
              <Button
                onClick={() => googleLoginHandler()}
              >
                Google
              </Button>

            </Box>
            {error && (
              <Alert severity="error" sx={{ mt: 3, width: "100%" }}>
                {error.error}
              </Alert>)}
            <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    autoComplete="current-email"
                    value={state.email}
                    onChange={inputChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={state.password}
                    onChange={inputChangeHandler}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={logining || !state.email || !state.password}
              >
                {logining ?
                  (<Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>) : "Sign In"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href={`/register`}>
                    Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Modal>
    </Home>
  );
};

export default Login;