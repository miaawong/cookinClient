import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import authReducer from "./reducers/auth";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import * as actionTypes from "./actionTypes/authActionTypes";

let store = createStore(
    authReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
axios.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            console.log("unauth");
            axios
                .post("http://localhost:3000/api/auth/refresh_token", null, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log("newjwt!!!", res);
                    let token = res.data.JWToken;
                    store.dispatch();
                    store.dispatch({
                        type: actionTypes.SET_NEW_TOKEN,
                        payload: token,
                    });
                })
                .catch((err) => {
                    console.log(err, "cannot get new jwt");
                });
        }
        return error;
    }
);
console.log(store.getState(), "store");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
