import React, { useContext } from "react";
import { CookinContext } from "../context";
import UserRecipe from "../components/UserRecipes";

const Dashboard = () => {
    const context = useContext(CookinContext);
    const { name, id } = context;
    if (!name && !id) {
        return <h1>Unauthorized</h1>;
    } else {
        return (
            <h1>
                Hi {name}, id: {id}
                <UserRecipe />
            </h1>
        );
    }
};
export default Dashboard;
