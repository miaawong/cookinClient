import React, { useEffect } from "react";
import RecipeComponent from "../recipes/components/recipe/Recipe";
import { useParams, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getCurrentRecipe } from "../recipes/recipeAction";
import * as recipeActionTypes from "../recipes/recipeActionTypes";

const Recipe = ({ currentRecipe, JWToken }) => {
    const { recipeId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentRecipe(recipeId, JWToken, history));
        return () => {
            dispatch({
                type: recipeActionTypes.CLEAR_CURRENT_RECIPE,
            });
        };
        //eslint-disable-next-line
    }, []);

    return <RecipeComponent />;
};
const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    JWToken: state["authReducer"].JWToken,
});

export default connect(mapStateToProps)(Recipe);
