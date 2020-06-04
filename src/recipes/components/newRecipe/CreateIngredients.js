import React, { useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { setDraftRecipe } from "../../recipeAction";
import { StyledForm, Submit } from "../../../StyledForm";
import { TextInput, Select, Box, Keyboard, FormField } from "grommet";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const Ingredient = styled.div`
    display: flex;
    flex-wrap: ${({ unit }) => (unit === "other" ? "wrap" : "no-wrap")};
    justify-content: space-evenly;
    align-items: center;
`;

const AddIngredients = styled.button`
    border: none;
    height: 3.5rem;
    background-color: #000;
`;

const CreateIngredients = ({ draftRecipe }) => {
    const [options, setOptions] = useState([
        " ",
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
    const ingredientRef = useRef();
    const amountRef = useRef();
    const unitRef = useRef();

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <h1>Ingredients</h1>
            {fields.map((input, index) => {
                const unit = watch(`ingredients[${index}].unit`);

                return (
                    <Ingredient key={input.id} unit={unit}>
                        <Box
                            direction="row-responsive"
                            align="center"
                            justify="between"
                            width="100%"
                        >
                            <Keyboard
                                onEnter={(e) => {
                                    e.preventDefault();
                                    amountRef.current.focus();
                                }}
                            >
                                <FormField label="Ingredient" margin="xsmall">
                                    <TextInput
                                        type="text"
                                        name={`ingredients[${index}].ingName`}
                                        placeholder="ingredient"
                                        ref={(e) => {
                                            register(e);
                                            ingredientRef.current = e;
                                        }}
                                    />
                                </FormField>
                            </Keyboard>
                            <Keyboard
                                onEnter={(e) => {
                                    e.preventDefault();
                                    unitRef.current.focus();
                                }}
                            >
                                <FormField label="Amount" margin="xsmall">
                                    <TextInput
                                        type="Number"
                                        name={`ingredients[${index}].amount`}
                                        placeholder="how much?"
                                        ref={(e) => {
                                            register(e);
                                            amountRef.current = e;
                                        }}
                                    />
                                </FormField>
                            </Keyboard>
                            <FormField label="Unit" margin="xsmall">
                                <Controller
                                    as={
                                        <Select
                                            options={options}
                                            value={option}
                                            dropHeight="small"
                                            ref={(e) => {
                                                register(e);
                                                unitRef.current = e;
                                            }}
                                        />
                                    }
                                    name={`ingredients[${index}].unit`}
                                    control={control}
                                    onChange={([e]) => e.value}
                                />
                            </FormField>

                            <FormField label="Add" margin="xsmall">
                                <AddIngredients
                                    onClick={(e) => {
                                        e.preventDefault();
                                        append({ ingredients: "ingredients" });
                                    }}
                                >
                                    <FaPlus
                                        style={{ color: "white" }}
                                        size={22}
                                    />
                                </AddIngredients>
                            </FormField>
                        </Box>

                        {unit === "other" && (
                            <div
                                style={{
                                    width: "100%",
                                }}
                            >
                                <Keyboard
                                    onEnter={(e) => {
                                        e.preventDefault();
                                        setOptions([...options, option]);
                                        setValue(
                                            `ingredients[${index}].unit`,
                                            option
                                        );
                                    }}
                                >
                                    <FormField
                                        label="Add New Option"
                                        margin="xsmall"
                                        style={{
                                            width: "17.5rem",
                                            margin: "1rem 42rem",
                                        }}
                                    >
                                        <TextInput
                                            placeholder="new option"
                                            name="otherOptions"
                                            ref={register}
                                            onChange={(event) =>
                                                setOpt(event.target.value)
                                            }
                                        />
                                    </FormField>
                                </Keyboard>
                            </div>
                        )}
                    </Ingredient>
                );
            })}
            <div>
                <Submit
                    type="submit"
                    value="Submit"
                    style={{ float: "right", margin: "2rem 0" }}
                >
                    Submit
                </Submit>
            </div>
        </StyledForm>
    );
};

const mapStateToProps = (state) => ({
    draftRecipe: state["recipeReducer"].draftRecipe,
});
export default connect(mapStateToProps)(CreateIngredients);
