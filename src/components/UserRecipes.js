import React, { useContext } from "react";
import { CookinContext } from "../context";
export default function UserRecipes() {
    const context = useContext(CookinContext);
    const { recipes } = context;

    return <div>{recipes[0]}hi from userrecipes</div>;
}
