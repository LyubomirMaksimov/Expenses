import { useState, useRef, useEffect } from "react";
import useHttp, { SignInUrl, SignUpUrl } from "../../hooks/use-http";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/authSlice";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const { isLoading, sendRequest: SignInorSignUp, data } = useHttp();
  const dispatch = useDispatch();
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchLoginSignUpModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    SignInorSignUp({
      url: isLoginMode ? SignInUrl : SignUpUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      },
    });
  };

  useEffect(() => {
    if (data !== null) {
      console.log(
        "------------------------------------------------------------" + data
      );

      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );

      dispatch(
        authActions.login({
          token: data.idToken,
          expirationTime: expirationTime.toISOString(),
        })
      );

      history.replace("/");
    }
  }, [data, dispatch, history]);

  return (
    <section className={classes.auth}>
      <h1>{isLoginMode ? "Login" : "Sign Up"}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLoginMode ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchLoginSignUpModeHandler}
          >
            {isLoginMode ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
