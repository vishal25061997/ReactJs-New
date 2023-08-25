import { configureStore } from "@reduxjs/toolkit";
import expense from "./expense";
import auth from "./auth";

import premium from "./premium";

const store = configureStore({
  reducer: { expenses: expense, authenticated: auth, premium: premium },
});

export default store;