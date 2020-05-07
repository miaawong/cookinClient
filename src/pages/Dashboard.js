import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import RecipesList from "../recipes/components/recipe/RecipesList";
// import Recipe from "../components/Recipe";
import { Redirect, Link } from "react-router-dom";
import { getAllRecipes } from "../recipes/recipeAction.js";

const Dashboard = ({ name, id, JWToken }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        JWToken && dispatch(getAllRecipes(JWToken));
        //eslint-disable-next-line
    }, []);
    if (!id) {
        return <Redirect to="/login"></Redirect>;
    }
    return (
        <h1>
            dashboard,Hi {name}, id: {id}
            <RecipesList />
            <Link to="/addRecipe">Add New Recipe</Link>
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
