import { useSelector } from "react-redux";
import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import classes from "./Layou.module.css";

const Layout = (props) => {
  const dark = useSelector((state) => state.premium.isDarkMode);
  const themeClass = dark ? `${classes.dark}` : "";
  return (
    <Fragment>
      <MainNavigation />
      <main className={`${themeClass}`}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;