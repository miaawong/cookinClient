import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getOneRecipe } from "../actions/authAction";

const ListOfRecipes = styled.div`
    width: 300px;
    border: 2px solid black;
`;

// useeffect to get all recipes names on mount?

const UserRecipes = (props) => {
    let name = props.recipes.map((recipe) => (
        <li>
            <button onClick={() => console.log("will get one recipe ")}>
                {recipe}
            </button>
        </li>
    ));
    return (
        <ListOfRecipes>
            <ul>{name}</ul>
        </ListOfRecipes>
    );
};
const mapStateToProps = (state) => ({
    recipes: state.recipes,
    JWToken: state.JWToken,
});

export default connect(mapStateToProps)(UserRecipes);
