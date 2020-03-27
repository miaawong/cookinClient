import React, { useContext } from "react";
import { CookinContext } from "../context";
export default function UserRecipes() {
    const context = useContext(CookinContext);
    const { findAllRecipes } = context;

    findAllRecipes();
    return <div>hi from userrecipes</div>;
}
