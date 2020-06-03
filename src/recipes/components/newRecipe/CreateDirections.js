import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { createRecipe } from "../../recipeAction";
import { StyledForm, Submit } from "./StyledForm";
import { Grommet, TextInput, Box } from "grommet";

const CreateDirections = ({ JWToken, draftRecipe }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { register, handleSubmit, errors, control, formState } = useForm({
        defaultValues: {
            directions: [""],
        },
    });
    const { fields, append, remove, insert } = useFieldArray({
        control,
        name: "directions",
    });

    const onSubmit = (data) => {
        draftRecipe.directions = data.directions;
        dispatch(createRecipe(JWToken, draftRecipe, history));
    };
    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <h1>Directions</h1>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    append({ directions: "directions" });
                }}
            >
                Add more steps
            </button>
            {fields.map((input, index) => {
                return (
                    <label key={index}>
                        directions
                        <TextInput
                            type="text"
                            name={`directions[${index}]`}
                            ref={register}
                        />
                    </label>
                );
            })}
            <br></br>
            <Submit type="submit" value="Submit">
                {" "}
                Submit
            </Submit>
            {/* {errors["instructions"] && (
            //             <p>{errors["instructions"].message}</p>
            //         )} */}{" "}
            {/* <br></br>
            // {errors["img"] && <p>{errors["img"].message}</p>}
            // <input type="submit" />  */}
        </StyledForm>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    draftRecipe: state["recipeReducer"].draftRecipe,
});
export default connect(mapStateToProps)(CreateDirections);
