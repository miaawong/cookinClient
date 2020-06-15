import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import CreateRecipeDetails from "../recipes/components/newRecipe/CreateRecipeDetails";
import CreateIngredients from "../recipes/components/newRecipe/CreateIngredients";
import CreateDirections from "../recipes/components/newRecipe/CreateDirections";
import { reset } from "../recipes/recipeAction";

const CreateRecipe = ({ JWToken, draftRecipeProgress }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, []);
    let currentStep;
    if (draftRecipeProgress === 0) {
        currentStep = <CreateRecipeDetails />;
    } else if (draftRecipeProgress === 1) {
        currentStep = <CreateIngredients />;
    } else if (draftRecipeProgress === 2) {
        currentStep = <CreateDirections />;
    }
    return <div style={{ height: "87%" }}>{currentStep}</div>;
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    draftRecipeProgress: state["recipeReducer"].draftRecipeProgress,
});
export default connect(mapStateToProps)(CreateRecipe);
