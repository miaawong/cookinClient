import React, { useContext } from "react";
import { CookinContext } from "../context";

const Dashboard = () => {
    const context = useContext(CookinContext);
    const { name } = context;
    return <h1>Hi {name}</h1>;
};
export default Dashboard;
