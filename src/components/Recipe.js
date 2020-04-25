import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Recipe = ({ currentRecipe }) => {
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
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
});
export default connect(mapStateToProps)(Recipe);
