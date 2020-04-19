import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import UserRecipes from "../components/UserRecipes";
// import CreateRecipe from "../components/CreateRecipe";
// import Recipe from "../components/Recipe";
import { Redirect } from "react-router-dom";
import { getAllRecipes } from "../redux/recipes/recipeAction.js";

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
            {/* <CreateRecipe /> */}
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
