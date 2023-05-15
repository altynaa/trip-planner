import React, {useState} from 'react';
import {Modal} from "@mui/material";
import {RegisterMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {googleLogin, register} from "@/features/users/usersThunks";
import {useRouter} from "next/router";
import Link from "next/link";
import {selectModalWindowStatus, switchModalWindow} from "@/features/users/usersSlice";
import Home from "@/pages/index";
import {useGoogleLogin} from "@react-oauth/google";

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const modalWindowStatus = useAppSelector(selectModalWindowStatus);
  const [state, setState] = useState<RegisterMutation>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const closeRegistrationModalWindow = async () => {
    await dispatch(switchModalWindow());
    await router.push('/');
  };

  const confirmPasswordInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(event.target.value);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState => ({...prevState, [name]: value})));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (state.password !== confirmedPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    try {
      await dispatch(register(state)).unwrap();
      await router.push('/');
    } catch (e) {
      throw new Error();
    }
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await dispatch(googleLogin(tokenResponse.access_token)).unwrap()
      await router.push('/');
    }
  });

  return (
    <Home>
      <Modal
        open={modalWindowStatus}
        onClose={closeRegistrationModalWindow}
      >
        <div className="registration">
          <div className="registration-header">
            <h4 className="registration-header_title">Registration</h4>
          </div>
          <form
            className="registration-form"
            onSubmit={submitFormHandler}
          >
            <div className="registration-form_box">
              <label htmlFor="registerEmail">
                Email
              </label>
              <input
                type="email"
                id="registerEmail"
                name="email"
                placeholder="E-mail"
                required
                value={state.email}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="registration-form_box">
              <label htmlFor="registerFirstName">
               First name
              </label>
              <input
                type="text"
                id="registerFirstName"
                name="firstName"
                placeholder="First name"
                required
                value={state.firstName}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="registration-form_box">
              <label htmlFor="registerLastName">
                Last name
              </label>
              <input
                type="text"
                id="registerLastName"
                name="lastName"
                placeholder="Last name"
                required
                value={state.lastName}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="registration-form_box">
              <label htmlFor="registerPassword">
                Password
              </label>
              <input
                type="password"
                id="registerPassword"
                name="password"
                placeholder="Password"
                required
                value={state.password}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="registration-form_box">
              <label htmlFor="confirmingPassword">
                {validationError && <b>{validationError}</b>}
              </label>
              <input
                type="password"
                id="confirmingPassword"
                name="confirmedPassword"
                placeholder="Password"
                required
                value={confirmedPassword}
                onChange={confirmPasswordInputChangeHandler}
              />
            </div>
            <div className="registration-form_box_links">
              <Link href="/login">Already have an account? Login!</Link>
            </div>
            <button
              type="submit"
              className="button register_signup_btn"
            >
              Sign up
            </button>
          </form>
          <div className="registration-footer">
            <h5>Register with google account</h5>
            <div className="registration-footer_buttons">
              <button
                className="social_auth_btn auth_google"
                onClick={() => googleLoginHandler()}
              >
                Google
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Home>
  );
};

export default Register;