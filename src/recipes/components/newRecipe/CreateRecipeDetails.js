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
            />
            <br></br>
            {errors["recipeName"] && <p>{errors["recipeName"].message}</p>}

            <TextInput
                type="text"
                name="recipeDesc"
                placeholder="Description"
                ref={register}
            />
            <br></br>
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
            <br></br>
            {errors["servings"] && <p>{errors["servings"].message}</p>}

            <Box
                direction="row-responsive"
                gap="large"
                // style={{
                //     display: "flex",
                //     width: "100%",
                //     justifyContent: "space-between",
                //     alignContent: "space-between",

                //     flexWrap: "no-wrap",
                // }}
            >
                <TextInput
                    style={{ width: "50%" }}
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

                <br></br>
                {errors["duration_hour"] && (
                    <p>{errors["duration_hour"].message}</p>
                )}
                <TextInput
                    style={{ width: "50%" }}
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

                {errors["duration_mins"] && (
                    <p>{errors["duration_mins"].message}</p>
                )}
            </Box>
            <br></br>
            <TextInput
                type="text"
                name="img"
                placeholder="Image"
                ref={register}
            />
            <br></br>
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
