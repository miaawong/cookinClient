import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
export default class Login extends Component {
    state = {
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
    onSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;

        const login = {
            email,
            password
        };
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        axios
            .post("http://localhost:3000/api/users/login", login, config)
            .then(res => {
                console.log(res);
                //save token to context(res.data.token)

                // any state cleanup if needed
                this.setState({ toDashboard: true, email: "", password: "" });
            })
            .catch(err => {
                this.setState({
                    errMsg: "Uh oh, looks like you're not suppose to be here..."
                });
            });
    };

    render() {
        const { email, password, toDashboard, errMsg } = this.state;
        if (toDashboard === true) {
            return <Redirect to="/dashboard" />;
        }

        if (errMsg) {
            return <h1>{errMsg}</h1>;
        }

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Email
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            placeholder="email"
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            placeholder="password"
                        />
                    </label>
                    <input
                        type="submit"
                        value="Submit"
                        onClick={this.onSubmit}
                    />
                </form>
            </div>
        );
    }
}
