import React, { useContext } from "react";
import { CookinContext } from "../context";
import UserRecipe from "../components/UserRecipes";

const Dashboard = () => {
    const context = useContext(CookinContext);
    const { name, id, JWToken } = context;
    if (!name && !id) {
        return <h1>Unauthorized</h1>;
    } else {
        return (
            <h1>
                Hi {name}, id: {id}, token:{JWToken}
                <UserRecipe />
            </h1>
        );
    }
};
export default Dashboard;
