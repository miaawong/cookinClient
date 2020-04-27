import React from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getCurrentRecipe } from "../redux/recipes/recipeAction";

const ListOfRecipes = styled.div`
    width: 300px;
    border: 2px solid black;
`;

// useeffect to get all recipes names on mount?

const UserRecipes = ({ recipes, JWToken }) => {
    let dispatch = useDispatch();
    let history = useHistory();
    if (recipes.length === 0) {
        return <h1>You don't have any recipes</h1>;
    } else {
        let name = recipes.map((recipe) => {
            return (
                <li key={recipe._id}>
                    <button
                        onClick={() => {
                            dispatch(
                                getCurrentRecipe(recipe._id, JWToken, history)
                            );
                        }}
                    >
                        {recipe.recipeName}
                    </button>
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
    JWToken: state["authReducer"].JWToken,
});

export default connect(mapStateToProps)(UserRecipes);
