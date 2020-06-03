import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { setDraftRecipe } from "../../recipeAction";
import { StyledForm, Submit } from "./StyledForm";
import { TextInput, Select, Box, Keyboard } from "grommet";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const Ingredient = styled.div`
    display: flex;
    flex-wrap: ${({ unit }) => (unit === "other" ? "wrap" : "no-wrap")};
    justify-content: space-evenly;
    align-items: center;
`;

const AddIngredients = styled.button`
    height: 3.5rem;
    background-color: #000;
`;

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
        register,
        handleSubmit,
        // errors,
        control,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            ingredients: [{ ingName: "", amount: null, unit: "" }],
        },
    });
    const { fields, append } = useFieldArray({
        control,
        name: "ingredients",
    });
    const onSubmit = (data) => {
        draftRecipe.ingredients = data.ingredients;
        dispatch(setDraftRecipe(draftRecipe));
    };

    const [option, setOpt] = useState("");

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <h1>Ingredients</h1>
            {fields.map((input, index) => {
                const unit = watch(`ingredients[${index}].unit`);

                return (
                    <Ingredient key={input.id} unit={unit}>
                        <Box direction="row-responsive" align="center">
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
                                as={
                                    <Select
                                        options={options}
                                        value={option}
                                        dropHeight="small"
                                    />
                                }
                                name={`ingredients[${index}].unit`}
                                control={control}
                                onChange={([e]) => e.value}
                            />

                            <AddIngredients
                                onClick={(e) => {
                                    e.preventDefault();
                                    append({ ingredients: "ingredients" });
                                }}
                            >
                                <FaPlus style={{ color: "white" }} size={22} />
                            </AddIngredients>
                        </Box>

                        {unit === "other" && (
                            <Keyboard
                                style={{ width: "100%" }}
                                onEnter={(e) => {
                                    e.preventDefault();
                                    setOptions([...options, option]);
                                    setValue(
                                        `ingredients[${index}].unit`,
                                        option
                                    );
                                }}
                            >
                                <TextInput
                                    style={{ margin: "1rem 0 " }}
                                    placeholder="new option"
                                    name="otherOptions"
                                    ref={register}
                                    onChange={(event) =>
                                        setOpt(event.target.value)
                                    }
                                />
                            </Keyboard>
                        )}
                    </Ingredient>
                );
            })}
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
