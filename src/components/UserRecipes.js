import React, { useContext } from "react";
import { CookinContext } from "../context";
import styled from "styled-components";
const ListOfRecipes = styled.div`
    width: 300px;
    border: 2px solid black;
`;
export default function UserRecipes() {
    const context = useContext(CookinContext);
    const { recipes, findRecipe } = context;

    const name = recipes.map(recipe => (
        <li>
            <a href="/test">{recipe.recipeName}</a>
        </li>
    ));
    return (
        <ListOfRecipes>
            <ul>{name}</ul>
        </ListOfRecipes>
    );
}
