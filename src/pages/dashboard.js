import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import RecipesList from "../recipes/components/recipe/RecipesList";
import RecipeCard from "../recipes/components/recipe/RecipeCard";
import { Redirect, Link } from "react-router-dom";
import { getAllRecipes } from "../recipes/recipeAction.js";

const Dashboard = ({ name, id, JWToken, recipes }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        JWToken && dispatch(getAllRecipes(JWToken));
        //eslint-disable-next-line
    }, []);
    if (!id) {
        return <Redirect to="/login"></Redirect>;
    }

    /* todo: recipelist when fullscreen */
    /* <RecipesList /> */

    return <RecipeCard recipes={recipes} />;
};
const mapStateToProps = (state) => ({
    toDashboard: state["authReducer"].toDashboard,
    name: state["authReducer"].name,
    id: state["authReducer"].id,
    JWToken: state["authReducer"].JWToken,
    recipes: state["recipeReducer"].recipes,
});
export default connect(mapStateToProps)(Dashboard);
