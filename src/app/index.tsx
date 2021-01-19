import * as React from "react";
import * as ReactDOM from "react-dom";
import MainContainer from "./containers/Main.container";
import { Provider } from "react-redux";
import { store } from "./store";
import { Router } from "react-router-dom";
import history from "./history";
import "./i18n";

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <MainContainer />
    </Provider>
  </Router>,
  document.getElementById("root")
);
