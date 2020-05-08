import React, { useEffect } from "react";
import { Box, Grommet, Nav } from "grommet";
import { connect, useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import CreateRecipe from "./recipes/components/newRecipe/CreateRecipe";
import Recipe from "./pages/recipe";
import { getJWT, logout } from "./auth/authAction";

const theme = {
    global: {
        colors: {
            background: "#f8f8f8",
            yellow: "#ffda0b",
            black: "#000000",
        },
        font: {
            family: "Roboto",
            size: "18px",
            height: "30px",
        },
        breakpoints: {
            small: {
                value: 600,
            },
            medium: {
                value: 900,
            },
            large: {
                value: 3000,
            },
        },
    },
};

const NavBar = (props) => (
    <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="background"
        pad={{ vertical: "medium", horizontal: "medium" }}
        elevation="small"
        {...props}
    />
);

const App = ({ JWToken }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!JWToken) {
            dispatch(getJWT());
        }
        //eslint-disable-next-line
    }, []);
    return (
        <Router>
            <Grommet theme={theme}>
                <NavBar>
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "black",
                        }}
                    >
                        {" "}
                        Home
                    </Link>
                    <Nav direction="row">
                        <Link
                            to="/signup"
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            Sign Up
                        </Link>

                        <Link
                            to="/login"
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            Login{" "}
                        </Link>
                    </Nav>
                </NavBar>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route
                        exact
                        path="/addRecipe"
                        component={CreateRecipe}
                    ></Route>
                    <Route exact path={"/recipes/:recipeId"}>
                        <Recipe />
                    </Route>
                </Switch>
            </Grommet>
        </Router>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state.JWToken,
});
export default connect(mapStateToProps)(App);
