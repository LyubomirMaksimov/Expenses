import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { authActions } from "./store/authSlice";

let logoutTimer;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const remainingTime = useSelector((state) => state.auth.expirationTime);

  if (isLoggedIn) {
    const sec = Math.floor((remainingTime / 1000) % 60).toFixed(0);
    const mins = Math.floor(remainingTime / 1000 / 60).toFixed(0);
    const hours = Math.floor(remainingTime / 1000 / 60 / 60).toFixed(0);

    console.log(`Auto Logout in: ${hours}:${mins}:${sec}`);
    logoutTimer = setTimeout(() => {
      dispatch(authActions.logout());
    }, remainingTime);
  } else {
    if (logoutTimer) {
      console.log(`I logged Out. Timer is removed`);
      clearTimeout(logoutTimer);
    }
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {isLoggedIn && <UserProfile />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
