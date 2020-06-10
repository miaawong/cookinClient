import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import CreateRecipeDetails from "../recipes/components/newRecipe/CreateRecipeDetails";
import CreateIngredients from "../recipes/components/newRecipe/CreateIngredients";
import CreateDirections from "../recipes/components/newRecipe/CreateDirections";
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

const CreateRecipe = ({ JWToken, draftRecipeProgress }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, []);
    let currentStep;
    if (draftRecipeProgress === 0) {
        currentStep = <CreateRecipeDetails />;
    } else if (draftRecipeProgress === 1) {
        currentStep = <CreateIngredients />;
    } else if (draftRecipeProgress === 2) {
        currentStep = <CreateDirections />;
    }
    return (
        <Grommet
            theme={grommetTheme}
            style={{ display: "flex", alignItems: "center", height: "85%" }}
        >
            {currentStep}
        </Grommet>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    draftRecipeProgress: state["recipeReducer"].draftRecipeProgress,
});
export default connect(mapStateToProps)(CreateRecipe);
