import React from "react";
import { connect } from "react-redux";
import UserRecipes from "../components/UserRecipes";
import CreateRecipe from "../components/CreateRecipe";
import Recipe from "../components/Recipe";

const Dashboard = (props) => {
    return (
        <h1>
            dashboard,Hi {props.name}, id: {props.id}
            <UserRecipes />
            {/* <CreateRecipe /> */}
            {/* <Recipe recipe={currentRecipe} /> */}
        </h1>
    );
};
const mapStateToProps = (state) => ({
    name: state.name,
    id: state.id,
});
export default connect(mapStateToProps)(Dashboard);
