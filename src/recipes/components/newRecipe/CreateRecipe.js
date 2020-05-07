import React from "react";
import { connect } from "react-redux";
import CreateRecipeDetails from "./CreateRecipeDetails";
import CreateIngredients from "./CreateIngredients";
import CreateDirections from "./CreateDirections";

const CreateRecipe = ({ JWToken, createRecipeProgress }) => {
    if (createRecipeProgress === 0) {
        return <CreateRecipeDetails />;
    } else if (createRecipeProgress === 1) {
        return <CreateIngredients />;
    } else if (createRecipeProgress === 2) {
        return <CreateDirections />;
    }
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    createRecipeProgress: state["recipeReducer"].createRecipeProgress,
});
export default connect(mapStateToProps)(CreateRecipe);
