import React, { Component } from "react";
import axios from "axios";

export default class SignUp extends Component {
    state = {
        fname: "",
        lname: "",
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
        const { fname, lname, email, password } = this.state;

        const newUser = {
            fname,
            lname,
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
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

        // let signUpNewUser = () => {};
        // signUpNewUser();
    };

    render() {
        const { fname, lname, email, password } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>
                        First Name
                        <input
                            type="text"
                            name="fname"
                            value={fname}
                            onChange={this.handleChange}
                            placeholder="John"
                        />
                    </label>
                    <label>
                        Last Name
                        <input
                            type="text"
                            name="lname"
                            value={lname}
                            onChange={this.handleChange}
                            placeholder="Smith"
                        />
                    </label>
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
