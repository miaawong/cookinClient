import React from "react";
import { Link } from "react-router-dom";

export default function Recipe({ recipe }) {
    console.log(recipe, "recipe");
    return (
        <div>
            recipe
            {recipe}....
            <Link to="/dashboard">Dashboard</Link>
        </div>
    );
}
