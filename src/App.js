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

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    display: flex;
    width: 14rem;
    height: 5rem;
    justify-content: center;
    align-items: center;
    :nth-last-child(2) {
        margin-top: auto;
    }

    & > label {
        display: none;
    }
`;
const LoggedInNav = styled.nav`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    right: 0;
    top: 0;
    background: black;
    width: 4rem;
    height: 100%;
    transition: 0.2s;
    padding-top: 2rem;

    &:hover {
        width: 20%;
        transition: 0.5s ease;
    }

    &:hover label {
        display: inline;
        /* margin-left: 1rem; */
        color: white;
        font-size: ${(props) => props.theme.fontSizes.medium};
    }

    &:hover > ${StyledLink} {
        justify-content: space-between;
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
    @media ${device.large} {
        justify-content: space-around;
    }
`;

const TopBar = styled.div`
    width: 90%;
    margin: ${({ JWToken }) => (JWToken ? "0 6em 0 auto" : "0 auto")};
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
    const [loggedIn, setLogged] = useState(false);
    useEffect(() => {
        if (!JWToken) {
            dispatch(getJWT());
            setLogged(true);
        }
        //eslint-disable-next-line
    }, []);

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
                    <LoggedInNav>
                        <StyledLink to="/explore">
                            <label>Explore</label>
                            <MdExplore style={{ color: "white" }} size={30} />
                        </StyledLink>

                        <StyledLink to="/dashboard">
                            <label>My Recipes</label>
                            <MdFavorite style={{ color: "white" }} size={30} />
                        </StyledLink>
                        <StyledLink to="/addRecipe">
                            <label>New Recipe</label>
                            <MdCreate style={{ color: "white" }} size={30} />
                        </StyledLink>
                        <StyledLink to="/settings">
                            <label>Settings</label>
                            <MdSettings style={{ color: "white" }} size={30} />
                        </StyledLink>
                        <StyledLink
                            onClick={() => {
                                dispatch(logout());
                            }}
                        >
                            <label>Logout</label>
                            <FaSignOutAlt
                                size={30}
                                style={{ color: "white" }}
                            />
                        </StyledLink>
                    </LoggedInNav>
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
