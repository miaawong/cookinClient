import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import RecipesList from "../recipes/components/recipe/RecipesList";
// import Recipe from "../components/Recipe";
import { Redirect, Link } from "react-router-dom";
import { getAllRecipes } from "../recipes/recipeAction.js";
import { logout } from "../auth/authAction";

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
        <div>
            <Link
                to="/dashboard"
                style={{
                    textDecoration: "none",
                    color: "black",
                }}
            >
                Dashboard
            </Link>

            <button
                onClick={() => {
                    dispatch(logout());
                }}
            >
                Logout
            </button>

            <h1>
                dashboard,Hi {name}, id: {id}
                <RecipesList />
                <Link to="/addRecipe">Add New Recipe</Link>
            </h1>
        </div>
    );
};
const mapStateToProps = (state) => ({
    toDashboard: state["authReducer"].toDashboard,
    name: state["authReducer"].name,
    id: state["authReducer"].id,
    JWToken: state["authReducer"].JWToken,
});
export default connect(mapStateToProps)(Dashboard);
