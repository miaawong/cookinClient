import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect, useSelector, useDispatch } from "react-redux";
import { login } from "../actions/authAction";

const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const [input, setForm] = useState({
        email: "",
        password: "",
    });
    const { email, password } = input;
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        console.log("hi");
        console.log(e.email);
        dispatch(login(e.email, e.password));
    };
    // if (toDashboard === true) {
    //     console.log("redirect");
    //     return <Redirect to="/dashboard" />;
    // }
    return (
        <div>
            <h1 style={{ color: "red" }}></h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Email
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        ref={register({
                            required: "I cannot be empty",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    <p>{errors.email && errors.email.message}</p>
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        ref={register({
                            required: "I cannot be empty",
                            minLength: {
                                value: 8,
                                message:
                                    "Must be at least 8 characters please! ",
                            },
                        })}
                    />
                    <p>{errors.password && errors.password.message}</p>
                </label>
                <input type="submit" />
            </form>
        </div>
    );
};

// const actionCreators = {
//     login,
// };
export default Login;
