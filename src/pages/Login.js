import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect, useSelector, useDispatch } from "react-redux";
import { login } from "../actions/authAction";
// const { register, handleSubmit, errors } = useForm();

class Login extends Component {
    state = {
        email: "",
        password: "",
    };
    //const context = useContext(CookinContext);
    //const { toDashboard, login, errMsg } = context;
    handleChange = (event) => {
        const newState = this.state;
        newState[event.target.name] = event.target.value;
        // newState.errors = validateLogin(newState);
        // newState.formReady = Object.keys(newState.errors).length === 0;
        this.setState(newState);
    };
    onSubmit = (data) => {
        data.preventDefault();
        this.props.onLogin(data);
    };
    // if (toDashboard === true) {
    //     console.log("redirect");
    //     return <Redirect to="/dashboard" />;
    // }
    render() {
        return (
            <div>
                <h1 style={{ color: "red" }}>{/* {errMsg} */}</h1>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Email
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            onChange={this.handleChange}
                            // ref={register({
                            //     required: "I cannot be empty",
                            //     pattern: {
                            //         value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            //         message: "Invalid email address",
                            //     },
                            // })}
                        />
                        {/* <p>{errors.email && errors.email.message}</p> */}
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this.handleChange}
                            // ref={register({
                            //     required: "I cannot be empty",
                            //     minLength: {
                            //         value: 8,
                            //         message:
                            //             "Must be at least 8 characters please! ",
                            //     },
                            // })}
                        />
                        {/* <p>{errors.password && errors.password.message}</p> */}
                    </label>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("dispatch");
    return {
        onLogin: (user, history) => dispatch(login(user, history)),
    };
};
export default connect(mapDispatchToProps)(Login);
