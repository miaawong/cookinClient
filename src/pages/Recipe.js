import React, { useEffect } from "react";
import RecipeComponent from "../components/RecipeComponent";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getCurrentRecipe } from "../redux/recipes/recipeAction";

const Recipe = ({ currentRecipe, JWToken }) => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();
    console.log(recipeId, "recipeid");
    useEffect(() => {
        dispatch(getCurrentRecipe(recipeId, JWToken));
    }, []);

    return (
        <div>
            <RecipeComponent />
        </div>
    );
};
const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    JWToken: state["authReducer"].JWToken,
});

export default connect(mapStateToProps)(Recipe);
