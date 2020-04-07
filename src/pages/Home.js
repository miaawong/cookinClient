import React, { useContext } from "react";
import { CookinContext } from "../context";
import { Link } from "react-router-dom";
export default function Home() {
    const context = useContext(CookinContext);
    const { name, id, JWToken, getJWToken, currentRecipe } = context;
    return <div>Home</div>;
}
