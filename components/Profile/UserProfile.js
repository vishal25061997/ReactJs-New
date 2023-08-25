import { useState } from "react";
import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const cancleHandeler = () => {
    navigate(-1);
  };
  return (
    <section className={classes.profile}>
      <span>Contact Details</span>
      <span className={classes.cancle}>
        <button onClick={cancleHandeler}>Cancle</button>
      </span>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;