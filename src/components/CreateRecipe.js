import React from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createRecipe } from "../redux/recipes/recipeAction";
import { Redirect, useHistory } from "react-router-dom";

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
                    <p></p>
                    {Object.keys(errors).length > 0 && (
                        <p>{errors.recipeName.message}</p>
                    )}
                    <input
                        type="text"
                        name="recipeDesc"
                        placeholder="Description"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <p></p>

                    {Object.keys(errors).length > 0 && (
                        <p>{errors.recipeDesc.message}</p>
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
                    <p></p>

                    {Object.keys(errors).length > 0 && (
                        <p>{errors.servings.message}</p>
                    )}
                    <input
                        type="text"
                        name="duration"
                        placeholder="duration"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <p></p>
                    {Object.keys(errors).length > 0 && (
                        <p>{errors.duration.message}</p>
                    )}
                    <input
                        type="text"
                        name="ingredients"
                        placeholder="ingredients"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <p></p>

                    {Object.keys(errors).length > 0 && (
                        <p>{errors.ingredients.message}</p>
                    )}
                    <input
                        type="text"
                        name="instructions"
                        placeholder="instructions"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <p></p>
                    {Object.keys(errors).length > 0 && (
                        <p>{errors.instructions.message}</p>
                    )}
                    <input
                        type="text"
                        name="img"
                        placeholder="Image"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <p></p>
                    {Object.keys(errors).length > 0 && (
                        <p>{errors.img.message}</p>
                    )}
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
