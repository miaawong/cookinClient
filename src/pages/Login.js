import React from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { login } from "../auth/authAction";
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
        <Grommet
            theme={grommetTheme}
            style={{ display: "flex", alignItems: "center" }}
        >
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <FormField label="Email">
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
                </FormField>
                <FormField label="Password">
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

const mapStateToProps = (state) => ({
    id: state["authReducer"].id,
});
export default connect(mapStateToProps)(Login);
