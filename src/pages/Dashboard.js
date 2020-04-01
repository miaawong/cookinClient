import React, { useContext } from "react";
import { CookinContext } from "../context";
import UserRecipes from "../components/UserRecipes";
import CreateRecipe from "../components/CreateRecipe";

const Dashboard = () => {
    const context = useContext(CookinContext);
    const { name, id, JWToken } = context;
    if (!name && !id) {
        return <h1>Unauthorized</h1>;
    } else {
        return (
            <h1>
                Hi {name}, id: {id}
                <UserRecipes />
                <CreateRecipe />
            </h1>
        );
    }
};
export default Dashboard;
