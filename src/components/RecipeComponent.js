import React from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditRecipe from "../components/EditRecipe";
import * as recipeActionTypes from "../redux/recipes/recipeActionTypes";
import { deleteRecipe } from "../redux/recipes/recipeAction";

const Recipe = ({ currentRecipe, edit, JWToken }) => {
    let dispatch = useDispatch();

    let history = useHistory();
    let {
        _id,
        recipeName,
        recipeDesc,
        servings,
        duration,
        ingredients,
        instructions,
        img,
        createdOn,
    } = currentRecipe;

    let duration_hour = Math.floor(duration / 60);
    let duration_mins = duration % 60;

    if (edit) {
        return <EditRecipe />;
    } else if (currentRecipe) {
        return (
            <div>
                <img alt={recipeName} src={img} />
                <h1>{recipeName}</h1>
                <h3>Description: {recipeDesc}</h3>
                <h3>Servings: {servings}</h3>
                <h3>
                    Prep&Cook Time: {duration_hour} hr {duration_mins} mins
                </h3>
                <h2>ingredients</h2>
                {ingredients &&
                    ingredients.map((ingredient, index) => (
                        <h3 key={index}>
                            {index + 1}
                            {ingredient.ingName} - {ingredient.amount}{" "}
                            {ingredient.unit}
                        </h3>
                    ))}
                <h3>
                    How To:
                    {instructions &&
                        instructions.map((instruction, index) => (
                            <p key={index}>
                                Step {index + 1}: {instruction}
                            </p>
                        ))}
                </h3>
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
                <button
                    onClick={() => {
                        dispatch(deleteRecipe(_id, JWToken, history));
                    }}
                >
                    Delete Recipe
                </button>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    edit: state["recipeReducer"].edit,
    JWToken: state["authReducer"].JWToken,
});
export default connect(mapStateToProps)(Recipe);
