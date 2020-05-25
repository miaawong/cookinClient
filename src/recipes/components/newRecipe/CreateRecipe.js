import React from "react";
import { connect } from "react-redux";
import CreateRecipeDetails from "./CreateRecipeDetails";
import CreateIngredients from "./CreateIngredients";
import CreateDirections from "./CreateDirections";

const CreateRecipe = ({ JWToken, draftRecipeProgress }) => {
    if (draftRecipeProgress === 0) {
        return <CreateRecipeDetails />;
    } else if (draftRecipeProgress === 1) {
        return <CreateIngredients />;
    } else if (draftRecipeProgress === 2) {
        return <CreateDirections />;
    }
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    draftRecipeProgress: state["recipeReducer"].draftRecipeProgress,
});
export default connect(mapStateToProps)(CreateRecipe);
