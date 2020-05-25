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
import LoggedInNav from "./main/components/LoggedInNav";

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
        height: 2.5rem;
        padding: 0;
    }
    @media ${device.medium} {
        background: black;
        bottom: 0;
        left: 0;
        top: auto;
        width: 100%;
        height: 3rem;
        padding: 0;
    }
    @media ${device.large} {
        background: black;
        bottom: 0;
        left: 0;
        top: auto;
        width: 100%;
        height: 3rem;
        padding: 0;
    }
    @media ${device.ipad} {
        background: black;
        bottom: 7.9rem;
        left: 0;
        top: auto;
        width: 100%;
        height: 3rem;
        padding: 0;
    }
`;
const Label = styled.label`
    font-size: ${(props) => props.theme.fontSizes.medium};
    background: black;
    padding: 0.5em;
    margin: 0 0.3em;

    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
    }

    @media ${device.full} {
        margin: 0 auto;
    }
`;

const Links = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    @media ${device.full} {
        justify-content: space-between;
    }
`;

const TopBar = styled.div`
    width: 90%;
    margin: ${({ JWToken }) => (JWToken ? "0 6em 0 auto" : "0 auto")};
    padding: 1rem 0;
    @media ${device.small} {
        width: 70%;
    }
    @media ${device.medium} {
        width: 85%;
    }
`;
const Logo = styled.img`
    height: 75px;
    @media ${device.small} {
        height: 70px;
    }
`;

const App = ({ JWToken }) => {
    const dispatch = useDispatch();
    const [loggedIn, setLogged] = useState(false);
    useEffect(() => {
        if (!JWToken) {
            dispatch(getJWT());
        }
        JWToken ? setLogged(true) : setLogged(false);
        //eslint-disable-next-line
    }, [JWToken]);

    return (
        <Router>
            <Theme>
                <TopBar JWToken={JWToken}>
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
                    <LoggedInNav></LoggedInNav>
                )}
            </Theme>
            <Switch>
                <Route exact path="/">
                    <Home loggedIn={loggedIn} />
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
