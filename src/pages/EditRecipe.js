import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editRecipe } from "../recipes/recipeAction";
import EditRecipeDetails from "../recipes/components/updateRecipe/EditRecipeDetails";
import EditIngredients from "../recipes/components/updateRecipe/EditIngredients";
import EditDirections from "../recipes/components/updateRecipe/EditDirections";
import { reset } from "../recipes/recipeAction";

const EditRecipe = ({ currentRecipe, draftRecipeProgress }) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, []);
    let currentStep;
    if (draftRecipeProgress === 0) {
        currentStep = <EditRecipeDetails recipe={currentRecipe} />;
    } else if (draftRecipeProgress === 1) {
        currentStep = <EditIngredients recipe={currentRecipe} />;
    } else if (draftRecipeProgress === 2) {
        currentStep = <EditDirections recipe={currentRecipe} />;
    }

    return <div style={{ height: "87%" }}>{currentStep}</div>;
};
const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    draftRecipeProgress: state["recipeReducer"].draftRecipeProgress,
});
export default connect(mapStateToProps)(EditRecipe);
