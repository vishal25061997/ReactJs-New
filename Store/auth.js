import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
    isEmailVerified: false,
  },
  reducers: {
    updateAuth(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("token", action.payload.token);
      console.log("state", state.token);
    },
    logOut(state, action) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      state.token = null;
      state.email = null;
    },
    veriFyEmail(state) {
      state.isEmailVerified = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;