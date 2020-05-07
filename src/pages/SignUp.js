import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "../auth/authAction";

const SignUp = () => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data) => {
        dispatch(signUp(data, history));
    };

    return (
        <div>
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
                                    message: " Must be at least 2 characters",
                                },
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
                                    message: "Invalid email address",
                                },
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
                                        "Must be at least 8 characters please! ",
                                },
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
