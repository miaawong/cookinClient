import React from "react";
import { Redirect, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { login } from "../auth/authAction";
import {
    StyledForm,
    Submit,
    TextInput,
    Main,
} from "../recipes/components/StyledForm";

const Login = ({ id }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        dispatch(login(data));
    };

    if (id) {
        // eslint-disable-next-line
        return <Redirect to="/dashboard" />;
    }
    return (
        <Main>
            <h1>Login</h1>
            <h3>
                Don't have an account?{" "}
                <Link to="/signup" style={{ textDecoration: "none" }}>
                    <label
                        style={{
                            color: "#F1CC00",
                            cursor: "pointer",
                        }}
                    >
                        Create one
                    </label>
                </Link>{" "}
                here.
            </h3>
            <StyledForm
                onSubmit={handleSubmit(onSubmit)}
                style={{ margin: "0", width: "auto" }}
            >
                <label>
                    Email
                    <TextInput
                        type="text"
                        name="email"
                        placeholder="Email"
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
                    <TextInput
                        type="password"
                        name="password"
                        placeholder="Password"
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

                <Submit
                    type="submit"
                    value="Submit"
                    style={{ display: "block", margin: "0 auto" }}
                >
                    Login
                </Submit>
            </StyledForm>
        </Main>
    );
};

const mapStateToProps = (state) => ({
    id: state["authReducer"].id,
});
export default connect(mapStateToProps)(Login);
