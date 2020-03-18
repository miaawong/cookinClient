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
        let signUpNewUser = async () => {
            try {
                const response = await axios.post(
                    "https://cors-anywhere.herokuapp.com/https://localhost:3000/api/users/",
                    newUser,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };
        signUpNewUser();
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
