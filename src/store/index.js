import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./expensesSlice";
// import { authApi } from "../services/authAPI";

const combinedReducer = combineReducers({
  exp: expenseReducer,
  auth: authReducer,
  // [authApi.reducerPath]: authApi.reducer,
});

const store = configureStore({
  reducer: combinedReducer,
});

export default store;
