import React from "react";
import RecipeComponent from "../components/Recipe";
import { useParams } from "react-router-dom";

export default function Recipe() {
    const { recipeId } = useParams();

    return (
        <div>
            <RecipeComponent recipe={recipeId}></RecipeComponent>
        </div>
    );
}
