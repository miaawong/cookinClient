import React, { useContext } from "react";
import { CookinContext } from "../context";
import UserRecipes from "../components/UserRecipes";
import CreateRecipe from "../components/CreateRecipe";
import Recipe from "../components/Recipe";

const Dashboard = () => {
    const context = useContext(CookinContext);
    const { name, id, JWToken, getJWToken, currentRecipe } = context;
    if (!name && !id) {
        return <h1>Unauthorized</h1>;
    } else {
        return (
            <h1>
                Hi {name}, id: {id}
                <UserRecipes />
                <CreateRecipe />
                <Recipe recipe={currentRecipe} />
                {/* <button onClick={getJWToken}></button> */}
            </h1>
        );
    }
};
export default Dashboard;
