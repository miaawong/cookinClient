import React, { Component } from "react";
import axios from "axios";
const CookinContext = React.createContext();

class CookinProvider extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        toDashboard: false,
        errMsg: ""
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    signUp = data => {
        const { name, email, password } = data;
        console.log(data, "data");

        const newUser = {
            name,
            email,
            password
        };
        console.log(newUser, "new");
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        axios
            .post("http://localhost:3000/api/users/", newUser, config)
            .then(res => {
                console.log(res.data, "res");
                this.setState({ toDashboard: true });
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
                    handleChange: this.handleChange
                }}
            >
                {this.props.children}
            </CookinContext.Provider>
        );
    }
}
export { CookinProvider, CookinContext };
