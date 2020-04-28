import React from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createRecipe } from "../redux/recipes/recipeAction";
import { useHistory } from "react-router-dom";

const CreateRecipe = ({ JWToken }) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const onSubmit = (data) => {
        dispatch(createRecipe(JWToken, data, history));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <input
                        type="text"
                        name="recipeName"
                        placeholder="Recipe Name"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <br></br>
                    {errors["recipeName"] && (
                        <p>{errors["recipeName"].message}</p>
                    )}

                    <input
                        type="text"
                        name="recipeDesc"
                        placeholder="Description"
                        ref={register({
                            required: "I cannot be empty",
                        })}
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
                            required: "I cannot be empty",
                            pattern: {
                                value: /^(0|[1-9][0-9]*)$/,
                                message: "must be a number",
                            },
                        })}
                    />
                    <br></br>
                    {errors["servings"] && <p>{errors["servings"].message}</p>}

                    <input
                        type="number"
                        name="duration_hour"
                        placeholder="duration_hour"
                        ref={register({
                            required: "I cannot be empty",
                            pattern: {
                                value: /^(0|[1-9][0-9]*)$/,
                                message: "must be a number",
                            },
                        })}
                    />
                    <br></br>
                    {errors["duration_hour"] && (
                        <p>{errors["duration_hour"].message}</p>
                    )}
                    <input
                        type="number"
                        name="duration_mins"
                        placeholder="duration_mins"
                        ref={register({
                            required: "I cannot be empty",
                            pattern: {
                                value: /^(0|[1-9][0-9]*)$/,
                                message: "must be a number",
                            },
                        })}
                    />
                    <br></br>
                    {errors["duration_mins"] && (
                        <p>{errors["duration_mins"].message}</p>
                    )}
                    <input
                        type="text"
                        name="ingredients"
                        placeholder="ingredients"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <br></br>
                    {errors["ingredients"] && (
                        <p>{errors["ingredients"].message}</p>
                    )}

                    <input
                        type="text"
                        name="instructions"
                        placeholder="instructions"
                        ref={register({
                            required: "I cannot be empty",
                        })}
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
});
export default connect(mapStateToProps)(CreateRecipe);
