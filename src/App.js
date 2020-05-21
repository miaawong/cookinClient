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
import logo from "./images/cookinLogo.png";
import { device } from "./Theme";
import { MdFavorite, MdExplore, MdCreate, MdSettings } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";

const Theme = styled.div`
    font-family: ${(props) => props.theme.font};
`;

const Nav = styled.div`
    width: 20%;
    position: fixed;
    top: 0;
    left: 75%;
    padding: 2rem 0;

    @media ${device.small} {
        background: black;
        bottom: 0;
        left: 0;
        top: auto;
        width: 100%;
        height: 3rem;
        padding: 0;
    }
    @media ${device.medium} {
        background: black;
        bottom: 0;
        left: 0;
        top: auto;
        width: 100%;
        height: 4rem;
        padding: 0;
    }
    @media ${device.large} {
        background: black;
        bottom: 0;
        left: 0;
        top: auto;
        width: 100%;
        height: 4rem;
        padding: 0;
    }
    @media ${device.ipad} {
        background: black;
        bottom: 0;
        left: 0;
        top: auto;
        width: 100%;
        height: 35rem;
        padding: 0;
    }
`;
const Label = styled.label`
    font-size: ${(props) => props.theme.fontSizes.medium};
    border-radius: 3px;
    background: black;
    padding: 0.5em;
    display: flex;
    justify-content: center;

    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
        padding: 0.5em;
        margin: 0 0.3em;
        display: flex;
        align-content: center;
    }
    @media ${device.medium} {
        padding: 0.5em;
        margin: 0 0.3em;
        display: flex;
        align-content: center;
    }
    @media ${device.large} {
        padding: 0.5em;
        margin: 0 0.3em;
        display: flex;
        align-content: center;
    }
`;

const LoggedInNav = styled.nav`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    right: 0;
    top: 0;
    background: black;
    width: 4em;
    height: 100%;
`;
const Links = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    @media ${device.small} {
        justify-content: space-around;
    }
    @media ${device.medium} {
        justify-content: space-around;
    }
    @media ${device.large} {
        justify-content: space-around;
    }
`;
const TopBar = styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 1rem 0;
`;
const Logo = styled.img`
    height: 75px;
    @media ${device.small} {
        height: 70px;
    }
`;

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
            <Theme>
                <TopBar>
                    <Link to="/">
                        <Logo src={logo} alt="cookin logo" />
                    </Link>
                </TopBar>

                {!JWToken ? (
                    <Nav>
                        <Links>
                            <Label>
                                <Link
                                    to="/signup"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </Label>

                            <Label>
                                <Link
                                    to="/login"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Login
                                </Link>
                            </Label>
                        </Links>
                    </Nav>
                ) : (
                    <LoggedInNav>
                        <Link
                            to="/explore"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            <MdExplore style={{ color: "white" }} size={30} />
                            {/* Explore */}
                        </Link>
                        <Link
                            to="/myRecipes"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            <MdFavorite style={{ color: "white" }} size={30} />
                            {/* My Recipe */}
                        </Link>
                        <Link
                            to="/create"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            <MdCreate style={{ color: "white" }} size={30} />
                            {/* Create New Recipe */}
                        </Link>
                        <Link
                            to="/settings"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            <MdSettings style={{ color: "white" }} size={30} />
                            {/* Settings */}
                        </Link>
                        <button style={{ background: "black", border: "none" }}>
                            <FaSignOutAlt
                                size={30}
                                style={{ color: "white" }}
                            />
                        </button>
                    </LoggedInNav>
                )}
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
    JWToken: state["authReducer"].JWToken,
});
export default connect(mapStateToProps)(App);
