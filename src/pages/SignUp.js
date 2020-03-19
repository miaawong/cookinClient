import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { validateSignUp } from "../validation/validation";
class SignUp extends Component {
    state = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        toDashboard: false
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onSubmit = e => {
        e.preventDefault();
        const { fname, lname, email, password, toDashboard } = this.state;
        validateSignUp(this.state);

        const newUser = {
            fname,
            lname,
            email,
            password,
            toDashboard
        };
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        axios
            .post("http://localhost:3000/api/users/", newUser, config)
            .then(res => {
                // console.log(res.data);
                this.setState({ toDashboard: true });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const { fname, lname, email, password, toDashboard } = this.state;

        if (toDashboard === true) {
            return <Redirect to="dashboard" />;
        }
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

export default SignUp;
