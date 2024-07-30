// REACT
import React from "react";
// REACT-ROUTER-DOM
import ReactDOM from "react-dom/client";
// * FILE APP
import App from "./App.jsx";
// CSS
import "./index.css";
// * FILE STORE
import { persistor, store } from "./redux/store.js";
// REACT-REDUX
import { Provider } from "react-redux";
// REDUX-PERSIST
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
