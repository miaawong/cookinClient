import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import UserRecipes from "../components/UserRecipes";
// import Recipe from "../components/Recipe";
import { Redirect, Link } from "react-router-dom";
import { getAllRecipes } from "../redux/recipes/recipeAction.js";

const Dashboard = ({ name, id, JWToken }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllRecipes(JWToken));
        //eslint-disable-next-line
    }, []);
    if (!id) {
        return <Redirect to="/login"></Redirect>;
    }
    return (
        <h1>
            dashboard,Hi {name}, id: {id}
            <UserRecipes />
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
