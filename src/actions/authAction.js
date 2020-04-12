import * as actionTypes from "../actionTypes/authActionTypes";
import axios from "axios";

export const login = ({ email, password }) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const loginData = { email, password };

    dispatch({ type: actionTypes.LOGIN_REQUEST });
    axios
        .post("http://localhost:3000/api/auth/login", loginData, config)
        .then((res) => {
            console.log("logged in!");
            // this.setState({ JWToken: res.data.token });
            // const { refreshToken } = res.data;
            // console.log(refreshToken, "refreshToken");
            // document.cookie = `refreshToken=${refreshToken}`;
            // this.isAuthed(this.state.JWToken);
        })
        .catch((err) => {
            console.log(err);
            // this.setState({ errMsg: "email or password maybe incorrect" });
        });
};
