import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "../auth/authAction";
import styled from "styled-components";
import { device } from "../Theme";
import { StyledForm, Submit } from "../StyledForm";
import { Grommet, FormField, TextInput } from "grommet";

const grommetTheme = {
    global: {
        font: {
            family: "Roboto",
            size: "24px",
        },
        colors: {
            focus: "#ffda0b",
            selected: "#ffda0b",
        },
        selected: {
            color: "#000000",
        },
        hover: {
            background: "#ffda0b",
            color: "#000000",
        },
        // control: {
        //     border: {
        //         radius: "0",
        //     },
        // },
    },

    textInput: {
        container: {
            extend: {
                width: "auto",
                border: "none",
                borderRadius: "0",
            },
        },
    },
    select: {
        control: {
            extend: {
                border: "2px solid black",
            },
        },
        icons: {
            color: "#ffda0b",
        },
    },
};

const SignUp = () => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data) => {
        dispatch(signUp(data, history));
    };

    return (
        <Grommet
            theme={grommetTheme}
            style={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <FormField label="Name">
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
                </FormField>

                <FormField label="Email">
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
                </FormField>

                <FormField label="Password">
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
                </FormField>

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
        </Grommet>
    );
};
export default SignUp;
