import React, { Component } from "react";
import axios from "axios";
const CookinContext = React.createContext();

class CookinProvider extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        toDashboard: false,
        errMsg: "",
        JWToken: ""
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    isAuthed = token => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios
            .get("http://localhost:3000/api/users/user", config)
            .then(res => {
                console.log("Login successful ");
                this.setState({
                    name: res.data.userData.name,
                    email: res.data.userData.email,
                    password: res.data.userData.password,
                    JWToken: res.data.userData.token
                });
            })
            .catch(err => {
                console.log(err, "err");
            });
    };
    signUp = data => {
        const { name, email, password } = data;
        const newUser = {
            name,
            email,
            password
        };

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        axios
            .post("http://localhost:3000/api/users/", newUser, config)

            .then(res => {
                this.setState({
                    name: res.data.newUser.name,
                    email: res.data.newUser.email,
                    password: res.data.newUser.password,
                    JWToken: res.data.token,
                    toDashboard: true
                });
                console.log("signed up");
                console.log(this.state);
                this.isAuthed(this.state.JWToken);
            })
            .catch(err => {
                this.setState({ errMsg: err });
            });
    };

    render() {
        return (
            <CookinContext.Provider
                value={{
                    ...this.state,
                    signUp: this.signUp,
                    handleChange: this.handleChange,
                    isAuthed: this.isAuthed
                }}
            >
                {this.props.children}
            </CookinContext.Provider>
        );
    }
}
export { CookinProvider, CookinContext };
