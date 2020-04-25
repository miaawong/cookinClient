import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CreateRecipe from "./components/CreateRecipe";
import Recipe from "./pages/recipe";
import { getJWT } from "./redux/auth/authAction";
import { getAllRecipes } from "./redux/recipes/recipeAction";

const App = ({ JWToken }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!JWToken) {
            dispatch(getJWT());
        }
        dispatch(getAllRecipes(JWToken));
    }, []);
    return (
        <Router>
            <div className="App">
                <header>
                    <ul>
                        <li>
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                Login{" "}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </header>
            </div>
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
                <Route exact path="/addRecipe" component={CreateRecipe}></Route>

                <Route exact path={"/recipes/:recipeId"} component={Recipe} />
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state.JWToken,
});
export default connect(mapStateToProps)(App);
