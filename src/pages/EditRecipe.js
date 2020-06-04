import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editRecipe } from "../recipes/recipeAction";
import EditRecipeDetails from "../recipes/components/updateRecipe/EditRecipeDetails";
import EditIngredients from "../recipes/components/updateRecipe/EditIngredients";
import EditDirections from "../recipes/components/updateRecipe/EditDirections";
import { Grommet } from "grommet";
import { reset } from "../recipes/recipeAction";
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
        // control: {
        //     border: {
        //         radius: "0",
        //     },
        // },
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
    select: {
        control: {
            extend: {
                border: "2px solid black",
            },
        },
        icons: {
            color: "#ffda0b",
        },
    },
};

const EditRecipe = ({ currentRecipe, draftRecipeProgress }) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, []);

    if (draftRecipeProgress === 0) {
        return (
            <Grommet
                theme={grommetTheme}
                style={{ display: "flex", alignItems: "center" }}
            >
                <EditRecipeDetails recipe={currentRecipe} />;
            </Grommet>
        );
    } else if (draftRecipeProgress === 1) {
        return (
            <Grommet
                theme={grommetTheme}
                style={{ display: "flex", alignItems: "center" }}
            >
                <EditIngredients recipe={currentRecipe} />;
            </Grommet>
        );
    } else if (draftRecipeProgress === 2) {
        return (
            <Grommet
                theme={grommetTheme}
                style={{ display: "flex", alignItems: "center" }}
            >
                <EditDirections recipe={currentRecipe} />;
            </Grommet>
        );
    }
};
const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    draftRecipeProgress: state["recipeReducer"].draftRecipeProgress,
});
export default connect(mapStateToProps)(EditRecipe);
