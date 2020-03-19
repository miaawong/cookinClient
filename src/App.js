import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
function App() {
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
                                    color: "white"
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
                                    color: "white"
                                }}
                            >
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="login"
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                            >
                                Login{" "}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="dashboard"
                                style={{
                                    textDecoration: "none",
                                    color: "white"
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
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
