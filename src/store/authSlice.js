import { createSlice } from "@reduxjs/toolkit";

const authState = { token: "", isLoggedIn: false, expirationTime: null };

export let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjEpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjEpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpTime = localStorage.getItem("expTime");
  const remainingTime = calculateRemainingTime(storedExpTime);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    return authState;
  }
  return {
    token: storedToken,
    isLoggedIn: true,
    expirationTime: remainingTime,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: retrieveStoredToken(),
  reducers: {
    login(state, action) {
      const token = action.payload.token;
      const expirationTime = action.payload.expirationTime;

      localStorage.setItem("token", token);
      localStorage.setItem("expTime", expirationTime);
      const remainingTime = calculateRemainingTime(expirationTime);

      state.token = token;
      state.expirationTime = remainingTime;
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("expTime");

      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      state.token = "";
      state.expirationTime = null;
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
