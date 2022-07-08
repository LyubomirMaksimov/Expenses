import { useState, useCallback } from "react";

export const SignInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo8II4R68Aemw8eQWqqUq8sLo9JapsHQU`;
export const SignUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo8II4R68Aemw8eQWqqUq8sLo9JapsHQU`;
export const GetExpensesURL = `https://react-authentication-91413-default-rtdb.firebaseio.com/expenses.json`;

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
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
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
