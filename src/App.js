import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
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
import pan from "./images/pan_icon.png";
import logo from "./images/cookinLogo.png";
import { device } from "./Theme";
import { FaBars } from "react-icons/fa";

const Theme = styled.div`
    font-family: ${(props) => props.theme.font};
`;

const Nav = styled.div`
    font-size: ${(props) => props.theme.fontSizes.medium};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2.5em;

    @media ${device.small} {
        padding: ${({ open }) => (open ? "1em 1em;" : "0em")};
    }
`;
const Links = styled.div`
    width: 20%;
    float: right;
    display: flex;
    flex-direction: ${({ open }) => (open ? "column" : "row")};
    justify-content: ${({ open }) => (open ? "space-evenly" : "space-between")};
    margin: ${({ open }) => (open ? "5em 0" : "0")};
    align-items: center;

    @media ${device.small} {
        z-index: 1;
        position: absolute;
        background: ${({ open }) => (open ? "white" : "none")};
        padding-top: 100px;
        width: 100vw;
        height: 100vh;
    }
    & > div {
        display: block;
        @media ${device.small} {
            display: ${({ open }) => (open ? "block" : "none")};
        }
    }
`;

const Logo = styled.img`
    @media ${device.small} {
        height: 75px;
    }
`;
const Hamburger = styled.a`
    display: none;
    padding: 0 1em !important;
    position: absolute;
    right: 0;

    @media ${device.small} {
        display: block;
    }
`;
const App = ({ JWToken }) => {
    const [open, setOpen] = useState(false);
    console.log(open, "open");

    const dispatch = useDispatch();
    useEffect(() => {
        if (!JWToken) {
            dispatch(getJWT());
        }
        //eslint-disable-next-line
    }, []);

    return (
        <Router>
            <Theme>
                <Nav>
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "black",
                        }}
                    >
                        <Logo src={logo} alt="cookin logo" />
                    </Link>

                    <Links open={open}>
                        <Hamburger
                            to="/"
                            onClick={() => setOpen(!open)}
                            open={open}
                        >
                            <FaBars style={{ color: "black" }} />
                        </Hamburger>
                        <div>
                            <Link
                                to="/signup"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                    background: "black",
                                    padding: ".5em",
                                }}
                            >
                                Sign Up
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                    background: "black",
                                    padding: ".5em",
                                }}
                            >
                                Login{" "}
                            </Link>
                        </div>
                    </Links>
                </Nav>
            </Theme>
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
                <Route exact path={"/recipes/:recipeId"}>
                    <Recipe />
                </Route>
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state.JWToken,
});
export default connect(mapStateToProps)(App);
