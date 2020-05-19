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
import { MdClose } from "react-icons/md";

const Theme = styled.div`
    font-family: ${(props) => props.theme.font};
`;

const Nav = styled.div`
    width: 90%;
    margin: 0 auto;
    font-size: ${(props) => props.theme.fontSizes.medium};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 0;
`;
const Links = styled.div`
    float: right;
    display: flex;
    justify-content: ${({ open }) => (open ? "center" : "space-between")};
    align-items: center;
    transition: 0.5s ease;

    @media ${device.small} {
        background: white;
        z-index: 1;
        position: ${({ open }) => (open ? "fixed" : "relative")};
        top: 13%;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 87%;

        transition: 0.5 ease;
    }
    & > Label {
        @media ${device.small} {
            display: ${({ open }) => (open ? "block" : "none")};
            transition: 0.5s;
        }
    }
`;
const Label = styled.label`
    font-size: ${(props) => props.theme.fontSizes.small};
    border-radius: 5px;
    text-decoration: none;
    color: white;
    background: black;
    padding: 0.5em;
    margin: 0 0.3em;
    @media ${device.small} {
        margin: 0;
    }
`;

const Logo = styled.img`
    height: 75px;
    @media ${device.small} {
        height: 70px;
    }
`;
const Hamburger = styled.button`
    display: none;
    @media ${device.small} {
        display: block;
        /* ${({ open }) => (open ? "none" : "block")}; */
    }
`;
const Close = styled.button`
    display: none;
    position: fixed;
    @media ${device.small} {
        display: ${({ open }) => (open ? "block" : "none")};
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
                        <Label>
                            <Link to="/signup" />
                            Sign Up
                        </Label>

                        <Label>
                            <Link to="/login" />
                            Login
                        </Label>
                    </Links>
                    <Hamburger open={open} onClick={() => setOpen(!open)}>
                        {open ? (
                            <MdClose style={{ color: "black" }} size={24} />
                        ) : (
                            <FaBars style={{ color: "black" }} size={24} />
                        )}
                    </Hamburger>
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
