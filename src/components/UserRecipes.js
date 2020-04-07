import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CookinContext } from "../context";
import styled from "styled-components";
const ListOfRecipes = styled.div`
    width: 300px;
    border: 2px solid black;
`;
export default function UserRecipes() {
    const context = useContext(CookinContext);
    const { recipes, findOneRecipe, showClickedRecipe } = context;

    const name = recipes.map(recipe => (
        <li>
            {/* <Link to={`/recipes/${recipe._id}`}>{recipe.recipeName}</Link> */}
            <button
                onClick={() => {
                    findOneRecipe(recipe._id);
                }}
            >
                {recipe.recipeName}
            </button>
        </li>
    ));
    return (
        <ListOfRecipes>
            <ul>{name}</ul>
        </ListOfRecipes>
    );
}
