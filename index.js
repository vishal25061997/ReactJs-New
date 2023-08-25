import ReactDOM from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";
import store from "./Store";
import "./index.css";
import App from "./App";
// import BrowserRouter  from  'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);