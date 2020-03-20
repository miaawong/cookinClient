import React, { useContext } from "react";
import { CookinContext } from "../context";
import { Redirect } from "react-router-dom";
// import { validateSignUp } from "../validation/validation";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const { register, handleSubmit, errors } = useForm();
    const context = useContext(CookinContext);
    const { name, email, password, toDashboard } = context;
    const { signUp, handleChange } = context;

    const onSubmit = e => {
        console.log(e);
        signUp(e);
        {
            if (toDashboard) {
                return <Redirect to="/dashboard" />;
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ fontSize: "25px", color: "red" }}> </div>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={name}
                        ref={register({ required: true })}
                        onChange={handleChange}
                        placeholder="John"
                        // required
                    />
                    {errors.name && "I am empty"}
                </label>

                <label>
                    Email
                    <input
                        type="text"
                        name="email"
                        value={email}
                        ref={register({ required: true })}
                        onChange={handleChange}
                        placeholder="email"
                        // required
                    />
                    {errors.email && "I am empty"}
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={password}
                        ref={register({ required: true })}
                        onChange={handleChange}
                        placeholder="password"
                        // required
                    />
                    {errors.password && "I am empty"}
                </label>
                <input type="submit" />
            </form>
        </div>
    );
};

export default SignUp;
