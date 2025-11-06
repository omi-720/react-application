import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
//import "./index.css";
import { Toaster } from "react-hot-toast";

const LOCAL_KEY = "ptm_tasks_v1";
store.subscribe(() => {
  try {
    const tasks = store.getState().tasks.tasks;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
  } catch (e) {
    // ignore
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
