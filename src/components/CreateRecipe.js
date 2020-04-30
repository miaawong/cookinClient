import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createRecipe } from "../redux/recipes/recipeAction";
import { useHistory } from "react-router-dom";

const CreateRecipe = ({ JWToken }) => {
    const [ingredients, setIngredients] = useState([
        { ingName: "", amount: 0, unit: "" },
    ]);
    const [instructions, setInstructions] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const onSubmit = (data) => {
        dispatch(createRecipe(JWToken, data, history));
    };

    const newIngInput = { ingName: "", amount: 0, unit: "" };
    const newInstructionInput = [];

    const addNewIngredient = (ingredients) => {
        setIngredients((prev) => {
            return [...prev, newIngInput];
        });
    };
    const addNewInstruction = (instructions) => {
        setInstructions((prev) => {
            return [...prev, newInstructionInput];
        });
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

                    <div>
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
                    </div>
                    <br></br>
                    {errors["duration_mins"] && (
                        <p>{errors["duration_mins"].message}</p>
                    )}

                    {/* ingredients */}
                    <button onClick={addNewIngredient}>
                        {" "}
                        Add more ingredient input
                    </button>
                    {ingredients.map((input) => (
                        <div>
                            <input
                                type="text"
                                name="ingName"
                                placeholder="ingredient"
                                ref={register({
                                    required: "I cannot be empty",
                                })}
                            />
                            <input
                                type="Number"
                                name="amount"
                                placeholder="how much?"
                                ref={register({
                                    required: "I cannot be empty",
                                })}
                            />
                            <select>
                                <option value=""></option>
                                <option value="tsp">tsp</option>
                                <option value="tbsp">tbsp</option>
                                <option value="cup">cup</option>
                                <option value="oz">oz</option>
                                <option value="lb">lb</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="mL">mL</option>
                                <option value="L">L</option>
                            </select>
                        </div>
                    ))}
                    <br></br>
                    {/* {errors["ingredients"] && (
                        <p>{errors["ingredients"].message}</p>
                    )} */}
                    {/* TO DO : ADD TEMP */}

                    <button onClick={addNewInstruction}>Add more steps</button>

                    {instructions.map((input) => (
                        <input
                            type="text"
                            name="instructions"
                            placeholder="instructions"
                            ref={register({
                                required: "I cannot be empty",
                            })}
                        />
                    ))}
                    <br></br>
                    {/* {errors["instructions"] && (
                        <p>{errors["instructions"].message}</p>
                    )} */}

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
