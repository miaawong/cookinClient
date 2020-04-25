import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListOfRecipes = styled.div`
    width: 300px;
    border: 2px solid black;
`;

// useeffect to get all recipes names on mount?

const UserRecipes = ({ recipes }) => {
    if (recipes.length === 0) {
        return <h1>You don't have any recipes</h1>;
    } else {
        console.log(recipes);
        let name = recipes.map((recipe) => {
            let url = `recipes/${recipe._id}`;
            return (
                <li key={recipe._id}>
                    <Link to={url}>{recipe.recipeName}</Link>
                </li>
            );
        });
        return (
            <ListOfRecipes>
                <ul>{name}</ul>
            </ListOfRecipes>
        );
    }
};
const mapStateToProps = (state) => ({
    recipes: state["recipeReducer"].recipes,
});

export default connect(mapStateToProps)(UserRecipes);