import React, { useContext } from "react";
import { CookinContext } from "../context";

const Dashboard = () => {
    const context = useContext(CookinContext);
    const { name, id } = context;
    if (!name && !id) {
        return <h1>Unauthorized</h1>;
    } else {
        return (
            <h1>
                Hi {name}, id: {id}
            </h1>
        );
    }
};
export default Dashboard;
