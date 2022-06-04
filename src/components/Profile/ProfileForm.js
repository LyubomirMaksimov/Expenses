import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const newPasswordInputRef = useRef();

  const SubmitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCo8II4R68Aemw8eQWqqUq8sLo9JapsHQU`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // assume always success
        // Password Change worked
        console.log(res);
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength={7}
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
