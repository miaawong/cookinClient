import React, { useState } from "react";
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
    let duration_hour = Math.floor(duration / 60);
    let duration_mins = duration % 60;

    const onSubmit = (data) => {
        dispatch(editRecipe(_id, data, JWToken, history));
    };
    const [ingredientInput, setIngredients] = useState(ingredients);
    const [ingredientCounter, setIngCounter] = useState(ingredients.length);

    const [instructionInput, setInstructions] = useState(instructions);
    const [instructionCounter, setInstrCounter] = useState(instructions.length);

    const addNewIngredient = (e) => {
        e.preventDefault();
        setIngredients((prev) => [...prev, ingredientCounter]);
        setIngCounter((prev) => prev + 1);
    };
    const addNewInstruction = (e) => {
        e.preventDefault();
        setInstructions((prev) => [...prev, ""]);
        setInstrCounter((prev) => prev + 1);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="recipeName"
                    placeholder="Recipe Name"
                    ref={register}
                    defaultValue={recipeName}
                />
                <br></br>
                {errors["recipeName"] && <p>{errors["recipeName"].message}</p>}
                <input
                    type="text"
                    name="recipeDesc"
                    placeholder="Description"
                    ref={register}
                    defaultValue={recipeDesc}
                />
                description
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
                    defaultValue={servings}
                />
                servings
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
                        defaultValue={duration_hour}
                    />
                    hr
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
                        defaultValue={duration_mins}
                    />
                    mins
                    <br></br>
                    {errors["duration_mins"] && (
                        <p>{errors["duration_mins"].message}</p>
                    )}
                </div>
                {/* ingredients */}
                <button onClick={addNewIngredient}>
                    {" "}
                    Add more ingredient input
                </button>
                {ingredientInput.map((ingredient, index) => {
                    const fieldName = `ingredients[${ingredient}]`;
                    return (
                        <fieldset name={fieldName} key={index}>
                            <div>
                                <input
                                    type="text"
                                    name={`${fieldName}.ingName`}
                                    placeholder="ingredient"
                                    ref={register}
                                    defaultValue={ingredient.ingName}
                                />
                                <input
                                    type="Number"
                                    name={`${fieldName}.amount`}
                                    placeholder="how much?"
                                    ref={register}
                                    defaultValue={ingredient.amount}
                                />
                                <select
                                    name={`${fieldName}.unit`}
                                    ref={register}
                                    defaultValue={ingredient.unit}
                                >
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
                        </fieldset>
                    );
                })}
                <br></br>
                <button onClick={addNewInstruction}>Add more steps</button>
                {instructionInput.map((instruction, index) => {
                    console.log(instruction, "instruction");
                    const fieldName = `instructions[${instruction}]`;
                    return (
                        <fieldset name={fieldName} key={index}>
                            <input
                                type="text"
                                name={`${fieldName}`}
                                placeholder="instructions"
                                ref={register}
                                defaultValue={instruction}
                            />
                        </fieldset>
                    );
                })}
                <input
                    type="text"
                    name="img"
                    placeholder="Image"
                    ref={register}
                    defaultValue={img}
                />
                <br></br>
                {errors["img"] && <p>{errors["img"].message}</p>}
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
