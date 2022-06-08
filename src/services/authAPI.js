import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authAPIHeaders = {
  "Content-Type": "application/json",
};

const DB_KEY = `AIzaSyCo8II4R68Aemw8eQWqqUq8sLo9JapsHQU`;
const baseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:";
const signIn = `signInWithPassword?key=${DB_KEY}`;
const signUp = `signUp?key=${DB_KEY}`;

const createRequest = (url, enteredEmail, enteredPassword) => ({
  url,
  method: "POST",
  Headers: authAPIHeaders,
  Body: {
    email: enteredEmail,
    password: enteredPassword,
    returnSecureToken: true,
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSignIn: builder.query({
      query: () => createRequest(signIn),
    }),
    getSignUp: builder.query({
      query: () => createRequest(signUp),
    }),
  }),
});

export const { useGetSignInQuery, useGetSignUpQuery } = authApi;
