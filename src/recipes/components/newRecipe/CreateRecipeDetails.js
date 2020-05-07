import React from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { setNewRecipe } from "../../recipeAction";

const CreateRecipeDetails = ({}) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        dispatch(setNewRecipe(data));
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Recipe Name
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
                </label>

                <input
                    type="text"
                    name="recipeDesc"
                    placeholder="Description"
                    ref={register}
                />
                <br></br>
                {errors["recipeDesc"] && <p>{errors["recipeDesc"].message}</p>}
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
                />
                <br></br>
                {errors["servings"] && <p>{errors["servings"].message}</p>}

                <div>
                    <input
                        type="number"
                        name="duration_hour"
                        placeholder="duration_hour"
                        ref={register({
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
                            pattern: {
                                value: /^(0|[1-9][0-9]*)$/,
                                message: "must be a number",
                            },
                        })}
                    />
                    {errors["duration_mins"] && (
                        <p>{errors["duration_mins"].message}</p>
                    )}
                    <input
                        type="text"
                        name="img"
                        placeholder="Image"
                        ref={register}
                    />
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
};

// const mapStateToProps = (state) => {};
export default CreateRecipeDetails;
