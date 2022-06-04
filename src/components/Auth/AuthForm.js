import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./AuthForm.module.css";
import { authActions } from "../../store/authSlice";

const AuthForm = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchLoginSignUpModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;
    if (isLoginMode) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo8II4R68Aemw8eQWqqUq8sLo9JapsHQU`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo8II4R68Aemw8eQWqqUq8sLo9JapsHQU`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";

            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
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
        // console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

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
