// @flow

// Styles
import "@vkontakte/vkui/dist/vkui.css";

import "core-js/es6/map";
import "core-js/es6/set";
import React from "react";
import ReactDOM from "react-dom";
import connect from "@vkontakte/vkui-connect";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleNotch,
  faRss,
  faUser,
  faUserCog
} from "@fortawesome/free-solid-svg-icons";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux";

library.add(faCircleNotch, faUserCog, faUser, faRss);

connect.send("VKWebAppInit", {});

const root = document.getElementById("root");

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
}
