import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import rootReducer from "./redux/rootReducer";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { getJWT } from "./redux/auth/authAction";
import Axios from "axios";

let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// with axios-auth-refresh lib
// const refreshAuth = (failedReq) => {
//     return Promise.resolve(
//         store.dispatch(getJWT()).then((token) => {
//             failedReq.response.config.headers[
//                 "Authorization"
//             ] = `Bearer ${token}`;
//         })
//     );
// };
//createAuthRefreshInterceptor(axios, refreshAuth);

axios.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.resolve(
            store.dispatch(getJWT()).then((token) => {
                console.log(token, "token");
                error.config.headers["Authorization"] = `Bearer ${token}`;
                return Axios.request(error.config);
            })
        );
    }
);

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
