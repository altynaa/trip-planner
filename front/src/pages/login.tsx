import React, {useState} from 'react';
import {Modal} from "@mui/material";
import Home from "@/pages/index";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectLoginError, selectModalWindowStatus, switchModalWindow} from "@/features/users/usersSlice";
import {useRouter} from "next/router";
import {LoginMutation} from "../../types";
import {googleLogin, login} from "@/features/users/usersThunks";
import {useGoogleLogin} from "@react-oauth/google";

const Login = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const modalWindowStatus = useAppSelector(selectModalWindowStatus);
    const loginError = useAppSelector(selectLoginError);
    const [state, setState] = useState<LoginMutation>({
        email: "",
        password: "",
    });

    const closeAuthorizationModalWindow = async () => {
        await dispatch(switchModalWindow());
        await router.push('/');
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState((prevState => ({...prevState, [name]: value})));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(login(state)).unwrap();
        await router.push('/');
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
                onClose={closeAuthorizationModalWindow}
            >
                <div className="login">
                    <div className="login-header">
                        <h4 className="login-header_title">Login</h4>
                    </div>
                    <form
                        className="login-form"
                        onSubmit={submitFormHandler}
                    >
                        <div className="authorization-form_box">
                            <label htmlFor="authEmail">
                                {loginError && (<b>{loginError.message}</b>)}
                            </label>
                            <input
                                type="email"
                                id="authEmail"
                                name="email"
                                placeholder="Email"
                                required
                                value={state.email}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="authorization-form_box">
                            <label htmlFor="authPassword">
                                {loginError && (<b>{loginError.message}</b>)}
                            </label>
                            <input
                                type="password"
                                id="authPassword"
                                name="password"
                                placeholder="Password"
                                required
                                value={state.password}
                                onChange={inputChangeHandler}
                            />
                        </div>

                        <button
                            type="submit"
                            className="button auth_login_btn"
                        >
                           Login
                        </button>
                    </form>
                    <div className="login-footer">
                        <h5>Login with google</h5>
                            <button
                                className="social_auth_btn auth_google"
                                onClick={() => googleLoginHandler()}
                            >
                                Google
                            </button>
                    </div>
                </div>
            </Modal>
        </Home>
    );
};

export default Login;