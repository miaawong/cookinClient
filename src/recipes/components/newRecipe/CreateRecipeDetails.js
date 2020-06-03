import React from "react";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { setDraftRecipe } from "../../recipeAction";
import { StyledForm, Submit } from "./StyledForm";
import { Grommet, TextInput, Box } from "grommet";

const CreateRecipeDetails = ({}) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        dispatch(setDraftRecipe(data));
    };
    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <h1>Details</h1>

            <TextInput
                type="text"
                name="recipeName"
                placeholder="Recipe Name"
                ref={register({
                    required: "I cannot be empty",
                })}
            ></TextInput>
            {errors["recipeName"] && <p>{errors["recipeName"].message}</p>}

            <TextInput
                type="text"
                name="recipeDesc"
                placeholder="Description"
                ref={register}
            />
            {errors["recipeDesc"] && <p>{errors["recipeDesc"].message}</p>}

            <TextInput
                type="text"
                name="servings"
                placeholder="Servings"
                ref={register({
                    pattern: {
                        value: /^(0|[1-9][0-9]*)$/,
                        message: "must be a number",
                    },
                })}
            />
            {errors["servings"] && <p>{errors["servings"].message}</p>}

            <Box
                direction="row-responsive"
                justify="between"
                align="center"
                pad={{ right: "small" }}
            >
                <Box direction="row-responsive" gap="small" align="center">
                    <TextInput
                        type="number"
                        name="duration_hour"
                        placeholder="Hour"
                        ref={register({
                            pattern: {
                                value: /^(0|[1-9][0-9]*)$/,
                                message: "must be a number",
                            },
                        })}
                    />
                    <span>hr</span>

                    {errors["duration_hour"] && (
                        <p style={{ padding: 0, margin: 0 }}>
                            {errors["duration_hour"].message}
                        </p>
                    )}
                </Box>
                <Box direction="row-responsive" gap="small" align="center">
                    <TextInput
                        type="number"
                        name="duration_mins"
                        placeholder="Mins"
                        ref={register({
                            pattern: {
                                value: /^(0|[1-9][0-9]*)$/,
                                message: "must be a number",
                            },
                        })}
                    />
                    <span>mins</span>
                    {errors["duration_mins"] && (
                        <p>{errors["duration_mins"].message}</p>
                    )}
                </Box>
            </Box>

            <TextInput
                type="text"
                name="img"
                placeholder="Image"
                ref={register}
            />

            <div>
                <Submit type="submit" value="Submit">
                    {" "}
                    Submit
                </Submit>
            </div>
        </StyledForm>
    );
};

// const mapStateToProps = (state) => {};
export default CreateRecipeDetails;
