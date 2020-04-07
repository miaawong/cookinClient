import React from "react";
import RecipeComponent from "../components/Recipe";

export default function Recipe({ match }) {
    const { recipeId } = match.params;
    console.log(recipeId);
    console.log("match:", match);
    return (
        <div>
            <RecipeComponent></RecipeComponent>
        </div>
    );
}
