import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
  name: "premium",
  initialState: { activated: false, isDarkMode: false, isBrightMode: true },
  reducers: {
    activatePremium: (state) => {
      state.activated = true;
    },
    isDarkModeTrue: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    isBrightModeTrue(state) {
      state.isBrightMode = !state.isBrightMode;
    },
  },
});

export const premiumAction = premiumSlice.actions;
export default premiumSlice.reducer;