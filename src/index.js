import React from "react";
import ReactDOM from "react-dom";
import Reducer from "./reducers/Reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>  
      <App />
  </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
