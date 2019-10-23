import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./components/App";
import "./styles/main.scss"

import { timeboxesReducer } from "./reducers";

const store = createStore(timeboxesReducer);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, 
    document.getElementById("root")
);
