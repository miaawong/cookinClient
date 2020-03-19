import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
    state = {
        email: "",
        password: ""
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
                // history.push() / window.href /

                // any state cleanup if needed
            })
            .catch(err => {
                console.log(err);
            });

        // let signUpNewUser = () => {};
        // signUpNewUser();
    };

    render() {
        const { email, password } = this.state;
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
                            type="text"
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
