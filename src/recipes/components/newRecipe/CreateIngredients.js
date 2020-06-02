import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { setDraftRecipe } from "../../recipeAction";
import { StyledForm, Submit } from "./StyledForm";
import { TextInput, Select } from "grommet";

const CreateIngredients = ({ draftRecipe }) => {
    const [options, setOptions] = useState([
        "tsp",
        "tbsp",
        "cup",
        "oz",
        "lb",
        "g",
        "kg",
        "ml",
        "l",
        "other",
    ]);
    const dispatch = useDispatch();
    const {
        unregister,
        register,
        handleSubmit,
        errors,
        control,
        formState,
        setValue,
        getValues,
        watch,
    } = useForm({
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
    // const [otherOption, setOtherOption] = useState(false);
    const [newOpt, setNew] = useState("");
    const handleChange = (e) => {
        if (e.value === "other") {
            return newOpt;
        } else {
            return e.value;
        }
    };
    console.log(options);

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            {fields.map((input, index) => {
                const unit = watch(`ingredients[${index}].unit`);

                return (
                    <div key={input.id}>
                        <TextInput
                            type="text"
                            name={`ingredients[${index}].ingName`}
                            placeholder="ingredient"
                            ref={register()}
                        />
                        <TextInput
                            type="Number"
                            name={`ingredients[${index}].amount`}
                            placeholder="how much?"
                            ref={register()}
                        />

                        <Controller
                            as={<Select value="" options={options} />}
                            name={`ingredients[${index}].unit`}
                            control={control}
                            onChange={([e]) => handleChange(e)}
                        />

                        <TextInput
                            name="otherOptions"
                            ref={register}
                            onChange={(event) => setNew(event.target.value)}
                            value={newOpt}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setOptions([...options, newOpt]);
                            }}
                        >
                            hi
                        </button>
                    </div>
                );
            })}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    append({ ingredients: "ingredients" });
                }}
            ></button>
            <Submit type="submit"> Submit</Submit>
            <br></br>
            {/* {errors["ingredients"] && (
                        <p>{errors["ingredients"].message}</p>
                    )} */}
        </StyledForm>
    );
};

const mapStateToProps = (state) => ({
    draftRecipe: state["recipeReducer"].draftRecipe,
});
export default connect(mapStateToProps)(CreateIngredients);
