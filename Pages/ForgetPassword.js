import { useRef, useState } from "react";

import classes from "./ForgetPassword.module.css";

import axios from "axios";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const newPasswardInputRef = useRef();

  const submitHandeler = async (event) => {
    event.preventDefault();
    const enteredNewPassward = newPasswardInputRef.current.value;
    console.log(enteredNewPassward);

    const email = localStorage.getItem("email");
    console.log(email);

    try {
      const User = {
        email,
        requestType: "PASSWORD_RESET",
      };
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAnS1sBtXU_cb7jWgJTT1Yj6fN0w5oaA8o",
        User
      );

      console.log(response);
      localStorage.setItem("email", response.data.email);
      setIsLoading(true);
      alert("changed successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandeler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswardInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ForgetPassword;