import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { logout } from "../../auth/authAction";
import { MdFavorite, MdExplore, MdCreate, MdSettings } from "react-icons/md";
import { FaSignOutAlt, FaSearch } from "react-icons/fa";
import { device } from "../../Theme";

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    display: flex;
    width: 10rem;
    height: 5rem;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    & > label {
        cursor: pointer;
        display: none;
    }
    :nth-last-child(2) {
        margin-top: 0;
    }

    @media ${device.laptop}, ${device.wide} {
        :nth-last-child(2) {
            margin-top: auto;
        }
    }
`;
const Nav = styled.nav`
    z-index: 1;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    right: 0;
    background: black;
    /* transition: 0.2s; */
    padding: 0;
    bottom: 0;
    width: 100%;
    height: 3rem;
    top: auto;
    flex-direction: row;
    &:hover {
        width: 100%;
    }
    &:hover label {
        display: none;
        margin: 0 auto;
    }
    &:hover > ${StyledLink} {
        justify-content: center;
    }
    @media ${device.wide}, ${device.laptop} {
        flex-direction: column;
        padding-top: 2rem;
        top: 0;
        height: 100%;
        width: 4rem;
        &:hover {
            width: 16rem;
            transition: 0.6s ease;
        }

        &:hover label {
            transition: 1s ease;
            display: inline-block;
            margin-left: 0.5rem;
            color: white;
            font-size: ${(props) => props.theme.fontSizes.medium};
        }

        &:hover > ${StyledLink} {
            justify-content: space-between;
        }
    }

    @media ${device.large}, ${device.ipad} {
        height: 5rem;
    }
`;
export default function LoggedInNav() {
    const dispatch = useDispatch();
    return (
        <Nav>
            <StyledLink to="/explore">
                <label>Explore</label>
                <FaSearch style={{ color: "white" }} size={30} />
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
