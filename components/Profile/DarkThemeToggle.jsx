import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { premiumAction } from "../../Store/premium";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
export const DarkThemeToggle = () => {
  const dark = useSelector((state) => state.premium.isDarkMode);
  const bright = useSelector((state) => state.premium.isBrightMode);
  console.log(dark, bright);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        {dark && (
          <button
            onClick={() => {
              dispatch(premiumAction.isDarkModeTrue());
              dispatch(premiumAction.isBrightModeTrue());
            }}>
            <MdDarkMode />
          </button>
        )}

        {bright && (
          <button
            onClick={() => {
              dispatch(premiumAction.isBrightModeTrue());
              dispatch(premiumAction.isDarkModeTrue());
            }}>
            <MdOutlineLightMode />
          </button>
        )}
      </div>
    </>
  );
};