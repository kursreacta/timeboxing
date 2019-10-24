import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import App from "./components/App";
import "./styles/main.scss"

import { timeboxesReducer } from "./reducers";

const store = createStore(timeboxesReducer, applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, 
    document.getElementById("root")
);
