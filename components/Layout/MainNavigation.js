import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth";
import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { premiumAction } from "../../Store/premium";
import { DarkThemeToggle } from "../Profile/DarkThemeToggle";
const MainNavigation = () => {
  // const auth = localStorage.getItem('token');
  const auth = useSelector((state) => state.authenticated.token);
  const isPremium = useSelector((state) => state.premium.activated);
  console.log(isPremium);

  console.log(auth, "auth mila");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandeler = () => {
    dispatch(authActions.logOut());
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {!auth && (
            <li>
              <Link to="/">Login/SignUp</Link>
            </li>
          )}
          {auth && (
            <li>
              <span>Your Profile is incomplete.</span>
              <Link to="/profile">complete now</Link>
            </li>
          )}

          {auth && (
            <li>
              <button onClick={logoutHandeler}>logout</button>
            </li>
          )}
          {auth && (
            <li>
              <Link to="/expenseStore">ExpenseStore</Link>
            </li>
          )}
          <li>{isPremium && <DarkThemeToggle />}</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;