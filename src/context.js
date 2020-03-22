import React, { Component } from "react";
import axios from "axios";
const CookinContext = React.createContext();

class CookinProvider extends Component {
    state = {
        id: "",
        name: "",
        email: "",
        password: "",
        toDashboard: false,
        errMsg: "",
        JWToken: ""
    };

    //react-hooks-form takes care of this
    // handleChange = e => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // };
    isAuthed = token => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios
            .get("http://localhost:3000/api/users/user", config)
            .then(res => {
                console.log("login successful");
                this.setState({
                    id: res.data.userData._id,
                    name: res.data.userData.name,
                    email: res.data.userData.email,
                    password: res.data.userData.password,
                    JWToken: res.data.userData.token,
                    toDashboard: true
                });
            })

            .catch(err => {
                console.log(err);
                this.setState({
                    errMsg: "you're not suppose to be here, please login."
                });
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
                    JWToken: res.data.token
                });
                console.log("signed up");
                this.isAuthed(this.state.JWToken);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    errMsg: "Something happen, sorry, try again."
                });
            });
    };

    login = data => {
        const { email, password } = data;
        const login = { email, password };
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        axios
            .post("http://localhost:3000/api/users/login", login, config)
            .then(res => {
                this.setState({ JWToken: res.data.token });
                this.isAuthed(this.state.JWToken);
            })
            .catch(err => {
                console.log(err);
                this.setState({ errMsg: "email or password maybe incorrect" });
            });
    };

    render() {
        return (
            <CookinContext.Provider
                value={{
                    ...this.state,
                    signUp: this.signUp,
                    isAuthed: this.isAuthed,
                    login: this.login
                }}
            >
                {this.props.children}
            </CookinContext.Provider>
        );
    }
}
export { CookinProvider, CookinContext };
