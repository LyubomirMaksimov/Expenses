import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApi } from "../services/authAPI";

const combinedReducer = combineReducers({
  //   counter: counterReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const store = configureStore({
  reducer: combinedReducer,
});

export default store;
