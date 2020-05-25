import React from "react";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editRecipe } from "../../recipeAction";
import EditRecipeDetails from "./EditRecipeDetails";
import EditIngredients from "./EditIngredients";
import EditDirections from "./EditDirections";

const EditRecipe = ({ currentRecipe, draftRecipeProgress }) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    if (draftRecipeProgress === 0) {
        return <EditRecipeDetails recipe={currentRecipe} />;
    } else if (draftRecipeProgress === 1) {
        return <EditIngredients recipe={currentRecipe} />;
    } else if (draftRecipeProgress === 2) {
        return <EditDirections recipe={currentRecipe} />;
    }
};
const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    draftRecipeProgress: state["recipeReducer"].draftRecipeProgress,
});
export default connect(mapStateToProps)(EditRecipe);
