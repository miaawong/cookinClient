import React from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createRecipe } from "../redux/recipes/recipeAction";
import { Redirect } from "react-router-dom";

const CreateRecipe = ({ JWToken }) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        dispatch(createRecipe(JWToken, data));
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
                    <p>{errors.recipeName}</p>
                    <input
                        type="text"
                        name="recipeDesc"
                        placeholder="Description"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <p>{errors.recipeDesc}</p>
                    <input
                        type="text"
                        name="servings"
                        placeholder="servings"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <p>{errors.servings}</p>
                    <input
                        type="text"
                        name="duration"
                        placeholder="duration"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <p>{errors.duration}</p>
                    <input
                        type="text"
                        name="ingredients"
                        placeholder="ingredients"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <p>{errors.ingredients}</p>
                    <input
                        type="text"
                        name="instructions"
                        placeholder="instructions"
                        ref={register({
                            required: "I cannot be empty",
                        })}
                    />
                    <p>{errors.instructions}</p>
                    <input
                        type="text"
                        name="img"
                        placeholder="Image"
                        ref={register({
                            // required: "I cannot be empty"
                        })}
                    />
                    <p>{errors.img}</p>
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
