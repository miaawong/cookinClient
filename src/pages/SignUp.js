import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "../auth/authAction";
import styled from "styled-components";
import { device } from "../Theme";
import {
    StyledForm,
    Submit,
    TextInput,
} from "../recipes/components/StyledForm";

const SignUp = () => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data) => {
        dispatch(signUp(data, history));
    };

    return (
        <div>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Name
                    <TextInput
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

                <label>
                    Email
                    <TextInput
                        type="text"
                        name="email"
                        ref={register({
                            required: "I cannot be empty",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid email address",
                            },
                        })}
                        placeholder="Email"
                    />
                    <p>{errors.email && errors.email.message}</p>
                </label>

                <label>
                    Password
                    <TextInput
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
                        placeholder="Password"
                    />
                    <p>{errors.password && errors.password.message}</p>
                </label>

                <div>
                    <Submit
                        type="submit"
                        value="Submit"
                        style={{ float: "right", margin: "2rem 0" }}
                    >
                        Submit
                    </Submit>
                </div>
            </StyledForm>
        </div>
    );
};
export default SignUp;
