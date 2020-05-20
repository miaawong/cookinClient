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
        height: 3rem;
        padding: 0;
    }
    @media ${device.large} {
        background: black;
        bottom: 0;
        left: 0;
        top: auto;
        width: 100%;
        height: 12rem;
        padding: 0;
    }
`;
const Label = styled.label`
    font-size: ${(props) => props.theme.fontSizes.medium};
    text-decoration: none;
    border-radius: 3px;
    color: white;
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
                <TopBar>
                    <Link to="/">
                        <Logo src={logo} alt="cookin logo" />
                    </Link>
                </TopBar>

                <Nav>
                    <Links open={open}>
                        <Label>
                            <Link to="/signup" />
                            Sign Up
                        </Label>

                        <Label>
                            <Link to="/login" />
                            Login
                        </Label>
                    </Links>
                    {/* <Hamburger open={open} onClick={() => setOpen(!open)}>
                        {open ? (
                            <MdClose style={{ color: "black" }} size={24} />
                        ) : (
                            <FaBars style={{ color: "black" }} size={24} />
                        )}
                    </Hamburger> */}
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
