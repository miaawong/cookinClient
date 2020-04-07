import React, { useContext } from "react";
import { CookinContext } from "../context";
import UserRecipes from "../components/UserRecipes";
import CreateRecipe from "../components/CreateRecipe";
import Recipe from "../components/Recipe";

const Dashboard = () => {
    const context = useContext(CookinContext);
    const { name, id, JWToken, getJWToken, currentRecipe, isAuthed } = context;

    return (
        <h1>
            Hi {name}, id: {id}, {JWToken}
            <UserRecipes />
            <CreateRecipe />
            <Recipe recipe={currentRecipe} />
        </h1>
    );
};
export default Dashboard;
