import React, { useEffect } from "react";
import RecipeComponent from "../components/Recipe";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getCurrentRecipe } from "../redux/recipes/recipeAction";

const Recipe = ({ currentRecipe, allRecipes }) => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();
    console.log(recipeId, "recipeid");
    console.log(allRecipes, "list of current recipe");
    useEffect(() => {
        setTimeout(() => {
            console.log("hi");
            console.log(recipeId);
            dispatch(getCurrentRecipe(recipeId, allRecipes));
        }, 1000);
    }, []);

    return (
        <div>
            <RecipeComponent recipe={recipeId}></RecipeComponent>
        </div>
    );
};
const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    allRecipes: state["recipeReducer"].recipes,
});

export default connect(mapStateToProps)(Recipe);
