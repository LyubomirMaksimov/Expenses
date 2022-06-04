import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const combinedReducer = combineReducers({
  //   counter: counterReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: combinedReducer,
});

export default store;
