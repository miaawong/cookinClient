import React from "react";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editRecipe } from "../redux/recipes/recipeAction";

const EditRecipe = ({ JWToken, currentRecipe }) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    let {
        _id,
        recipeName,
        recipeDesc,
        servings,
        duration,
        ingredients,
        instructions,
        img,
    } = currentRecipe;

    const onSubmit = (data) => {
        dispatch(editRecipe(_id, data, JWToken, history));

        console.log("set edit to false");
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <input
                        type="text"
                        name="recipeName"
                        placeholder="Recipe Name"
                        ref={register}
                        defaultValue={recipeName}
                    />
                    <br></br>
                    {errors["recipeName"] && (
                        <p>{errors["recipeName"].message}</p>
                    )}

                    <input
                        type="text"
                        name="recipeDesc"
                        placeholder="Description"
                        ref={register}
                        defaultValue={recipeDesc}
                    />
                    <br></br>
                    {errors["recipeDesc"] && (
                        <p>{errors["recipeDesc"].message}</p>
                    )}
                    <input
                        type="text"
                        name="servings"
                        placeholder="servings"
                        ref={register({
                            pattern: {
                                value: /^(0|[1-9][0-9]*)$/,
                                message: "must be a number",
                            },
                        })}
                        defaultValue={servings}
                    />
                    <br></br>
                    {errors["servings"] && <p>{errors["servings"].message}</p>}

                    <input
                        type="text"
                        name="duration"
                        placeholder="duration"
                        ref={register({
                            pattern: {
                                value: /^(0|[1-9][0-9]*)$/,
                                message: "must be a number",
                            },
                        })}
                        defaultValue={duration}
                    />
                    <br></br>
                    {errors["duration"] && <p>{errors["duration"].message}</p>}
                    <input
                        type="text"
                        name="ingredients"
                        placeholder="ingredients"
                        ref={register}
                        defaultValue={ingredients}
                    />
                    <br></br>
                    {errors["ingredients"] && (
                        <p>{errors["ingredients"].message}</p>
                    )}

                    <input
                        type="text"
                        name="instructions"
                        placeholder="instructions"
                        ref={register}
                        defaultValue={instructions}
                    />
                    <br></br>
                    {errors["instructions"] && (
                        <p>{errors["instructions"].message}</p>
                    )}

                    <input
                        type="text"
                        name="img"
                        placeholder="Image"
                        ref={register}
                        defaultValue={img}
                    />
                    <br></br>
                    {errors["img"] && <p>{errors["img"].message}</p>}
                </label>
                <input type="submit" />
            </form>
        </div>
    );
};
const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    currentRecipe: state["recipeReducer"].currentRecipe,
});
export default connect(mapStateToProps)(EditRecipe);
