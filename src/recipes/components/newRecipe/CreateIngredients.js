import React from "react";
import { connect, useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { setDraftRecipe } from "../../recipeAction";

const CreateIngredients = ({ draftRecipe }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, control, formState } = useForm({
        defaultValues: {
            ingredients: [{ ingName: "", amount: null, unit: "" }],
        },
    });
    const { fields, append, remove, insert } = useFieldArray({
        control,
        name: "ingredients",
    });
    const onSubmit = (data) => {
        draftRecipe.ingredients = data.ingredients;
        dispatch(setDraftRecipe(draftRecipe));
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((input, index) => {
                    return (
                        <div key={input.id}>
                            <input
                                type="text"
                                name={`ingredients[${index}].ingName`}
                                placeholder="ingredient"
                                ref={register()}
                            />
                            <input
                                type="Number"
                                name={`ingredients[${index}].amount`}
                                placeholder="how much?"
                                ref={register()}
                            />
                            <select
                                name={`ingredients[${index}].unit`}
                                ref={register()}
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
                    );
                })}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        append({ ingredients: "ingredients" });
                    }}
                ></button>
                <input type="submit" />
                <br></br>
                {/* {errors["ingredients"] && (
                        <p>{errors["ingredients"].message}</p>
                    )} */}
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    draftRecipe: state["recipeReducer"].draftRecipe,
});
export default connect(mapStateToProps)(CreateIngredients);
