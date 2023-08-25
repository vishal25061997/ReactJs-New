import { useRef, useState } from "react";
import axios from "axios";
import classes from "./ProfileForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth";
import { useEffect, useCallback } from "react";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const isEmailVerified = useSelector(
    (state) => state.expenses.isEmailVerified
  );
  const token = localStorage.getItem("token");

  const nameRef = useRef();
  const profileRef = useRef();
  const [isVerify, setIsVerify] = useState(false);
  const getProfileData = useCallback(async () => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAnS1sBtXU_cb7jWgJTT1Yj6fN0w5oaA8o",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    // console.log(data.users[0].emailVerified);
    // setIsVerified(data.users[0].emailVerified);
    nameRef.current.value = data.users[0].displayName;
    profileRef.current.value = data.users[0].photoUrl;
    setIsVerify(data.users[0].emailVerified);
    // verifyEmail.current.value = data.users[0].email;
  }, []);

  async function onUpdate(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const profile = profileRef.current.value;
    const token = localStorage.getItem("token");
    console.log(name, profile);
    // console.log(token,'token mila');
    // console.log(token);
    if (name && profile) {
      console.log(name);
      const body = {
        idToken: token,
        displayName: name,
        photoUrl: profile,
        returnSecureToken: true,
      };
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAnS1sBtXU_cb7jWgJTT1Yj6fN0w5oaA8o",
          body
        );

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  const verifyEmailHandeler = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("email");
    const userToken = localStorage.getItem("token");

    console.log("emailmila", userEmail);

    try {
      const User = {
        userEmail,
        idToken: userToken,
        requestType: "VERIFY_EMAIL",
      };
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAnS1sBtXU_cb7jWgJTT1Yj6fN0w5oaA8o",
        User
      );

      console.log(response);
      dispatch(authActions.veriFyEmail());
      alert("Email Verified Sucessfully");
    } catch (error) {
      alert("notverified");
    }
  };
  return (
    <div>
      <div className={classes.form}>
        <form onSubmit={onUpdate}>
          <label>Full Name </label>
          <input type="text" ref={nameRef} className={classes.style} required />

          <label>Profile Photo Url </label>
          <input
            type="text"
            ref={profileRef}
            required
            className={classes.style}
          />

          <div>
            <button className={classes.btn}>Update</button>
          </div>
        </form>
      </div>
      <div>
        {!isVerify && (
          <button className={classes.btn} onClick={verifyEmailHandeler}>
            Verify Email
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;