import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { logout } from "../../auth/authAction";
import { MdFavorite, MdExplore, MdCreate, MdSettings } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    display: flex;
    width: 10rem;
    height: 5rem;
    justify-content: center;
    align-items: center;
    transition: 1s;
    :nth-last-child(2) {
        margin-top: auto;
    }

    & > label {
        display: none;
    }
`;
const Nav = styled.nav`
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
        width: 14rem;
        transition: 0.5s ease;
    }

    &:hover label {
        display: inline;
        margin-left: 0.5rem;
        color: white;
        font-size: ${(props) => props.theme.fontSizes.medium};
    }

    &:hover > ${StyledLink} {
        justify-content: space-between;
    }
`;
export default function LoggedInNav() {
    const dispatch = useDispatch();
    return (
        <Nav>
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
                <FaSignOutAlt size={30} style={{ color: "white" }} />
            </StyledLink>
        </Nav>
    );
}
