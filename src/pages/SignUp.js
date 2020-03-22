import React, { useContext } from "react";
import { CookinContext } from "../context";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const { register, handleSubmit, errors } = useForm();
    const context = useContext(CookinContext);
    const { toDashboard, signUp, errMsg } = context;

    const onSubmit = data => {
        signUp(data);
    };

    if (toDashboard === true) {
        console.log("redirect");
        return <Redirect to="/dashboard" />;
    }

    return (
        <div>
            <h1 style={{ color: "red" }}>{errMsg}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ fontSize: "25px", color: "red" }}> </div>
                <div>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            ref={register({
                                required: "I cannot be empty",
                                minLength: {
                                    value: 2,
                                    message: " Must be at least 2 characters"
                                }
                            })}
                            placeholder="John"
                        />
                        <p>{errors.name && errors.name.message}</p>
                    </label>
                </div>
                <div>
                    <label>
                        Email
                        <input
                            type="text"
                            name="email"
                            ref={register({
                                required: "I cannot be empty",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Invalid email address"
                                }
                            })}
                            placeholder="email"
                        />
                        <p>{errors.email && errors.email.message}</p>
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            ref={register({
                                required: "I cannot be empty",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Must be at least 8 characters please! "
                                }
                            })}
                            placeholder="password"
                        />
                        <p>{errors.password && errors.password.message}</p>
                    </label>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
};
export default SignUp;
