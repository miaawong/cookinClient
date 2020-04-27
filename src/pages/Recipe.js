import React, { useEffect } from "react";
import RecipeComponent from "../components/RecipeComponent";
import { useParams, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getCurrentRecipe } from "../redux/recipes/recipeAction";

const Recipe = ({ currentRecipe, JWToken }) => {
    const { recipeId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    console.log(recipeId, "recipeid");
    useEffect(() => {
        dispatch(getCurrentRecipe(recipeId, JWToken, history));
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <RecipeComponent />
        </div>
    );
};
const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    JWToken: state["authReducer"].JWToken,
});

export default connect(mapStateToProps)(Recipe);
