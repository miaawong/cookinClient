import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import rootReducer from "./redux/rootReducer";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { getJWT } from "./redux/auth/authAction";

let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
axios.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            console.log("jwtoken expired");
            store.dispatch(getJWT());
        }
        return error;
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
