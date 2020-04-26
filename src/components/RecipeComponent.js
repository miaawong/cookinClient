import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import EditRecipe from "../components/EditRecipe";
import * as recipeActionTypes from "../redux/recipes/recipeActionTypes";

const Recipe = ({ currentRecipe, edit }) => {
    let dispatch = useDispatch();
    let {
        recipeName,
        recipeDesc,
        servings,
        duration,
        ingredients,
        instructions,
        img,
        createdOn,
    } = currentRecipe;

    if (edit) {
        return <EditRecipe />;
    } else {
        return (
            <div>
                <img src={img} />
                <h1>{recipeName}</h1>
                <h3>Description: {recipeDesc}</h3>
                <h3>Servings: {servings}</h3>
                <h3>Prep&Cook Time: {duration} mins</h3>
                <h3>Ingredients: {ingredients}</h3>
                <h3>How To: {instructions}</h3>
                <p>{createdOn}</p>
                <Link to="/dashboard">Dashboard</Link>
                <button
                    onClick={() => {
                        dispatch({
                            type: recipeActionTypes.EDIT_STATE,
                            payload: true,
                        });
                    }}
                >
                    Edit Recipe
                </button>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    edit: state["recipeReducer"].edit,
});
export default connect(mapStateToProps)(Recipe);
