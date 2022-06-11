import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../store/authSlice";

export const SignInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo8II4R68Aemw8eQWqqUq8sLo9JapsHQU`;
export const SignUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo8II4R68Aemw8eQWqqUq8sLo9JapsHQU`;

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        console.log(data);

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
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [dispatch, history]
  );

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
