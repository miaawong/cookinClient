import React from "react";
import { connect } from "react-redux";
import CreateRecipeDetails from "./CreateRecipeDetails";
import CreateIngredients from "./CreateIngredients";
import CreateDirections from "./CreateDirections";
import { Grommet } from "grommet";
const grommetTheme = {
    global: {
        font: {
            family: "Roboto",
            size: "24px",
        },
        colors: {
            focus: "#ffda0b",
            selected: "#ffda0b",
        },
        selected: {
            color: "#000000",
        },
        hover: {
            background: "#ffda0b",
            color: "#000000",
        },
        control: {
            border: {
                radius: "0",
            },
        },
    },
    button: {
        height: "3.5rem",
    },
    textInput: {
        container: {
            extend: {
                width: "auto",
                border: "none",
                borderRadius: "0",
            },
        },
    },
};

const CreateRecipe = ({ JWToken, draftRecipeProgress }) => {
    if (draftRecipeProgress === 0) {
        return (
            <Grommet
                theme={grommetTheme}
                style={{ height: "90%", display: "flex", alignItems: "center" }}
            >
                <CreateRecipeDetails />
            </Grommet>
        );
    } else if (draftRecipeProgress === 1) {
        return (
            <Grommet
                theme={grommetTheme}
                style={{ height: "90%", display: "flex", alignItems: "center" }}
            >
                <CreateIngredients />
            </Grommet>
        );
    } else if (draftRecipeProgress === 2) {
        return (
            <Grommet
                theme={grommetTheme}
                style={{ height: "90%", display: "flex", alignItems: "center" }}
            >
                <CreateDirections />
            </Grommet>
        );
    }
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    draftRecipeProgress: state["recipeReducer"].draftRecipeProgress,
});
export default connect(mapStateToProps)(CreateRecipe);
