import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import UserRecipes from "../components/UserRecipes";
// import Recipe from "../components/Recipe";
import { Redirect, Link, Route } from "react-router-dom";
import { getAllRecipes } from "../redux/recipes/recipeAction.js";
import CreateRecipe from "../components/CreateRecipe";

const Dashboard = ({ name, id, JWToken }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllRecipes(JWToken));
    }, []);
    if (!id) {
        return <Redirect to="/login"></Redirect>;
    }
    return (
        <h1>
            dashboard,Hi {name}, id: {id}
            <UserRecipes />
            <Link to="/addRecipe">Add New Recipe</Link>
            {/* <Recipe recipe={currentRecipe} /> */}
        </h1>
    );
};
const mapStateToProps = (state) => ({
    toDashboard: state["authReducer"].toDashboard,
    name: state["authReducer"].name,
    id: state["authReducer"].id,
    JWToken: state["authReducer"].JWToken,
});
export default connect(mapStateToProps)(Dashboard);
