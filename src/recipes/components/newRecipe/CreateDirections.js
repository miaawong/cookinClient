import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { createRecipe } from "../../recipeAction";
import { StyledForm, Submit, TextArea, ProgressLabel } from "../StyledForm";
import { FaPlus } from "react-icons/fa";

const AddMore = styled.button`
    display: block;
    color: white;
    padding: 0.5rem;
    border: none;
    background: #000;
`;

const CreateDirections = ({ JWToken, draftRecipe, image }) => {
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
        console.log("hi");
        draftRecipe.directions = data.directions;
        dispatch(createRecipe(JWToken, draftRecipe, history));
    };
    return (
        <StyledForm
            onSubmit={handleSubmit(onSubmit)}
            style={{ justifyContent: "flex-start" }}
        >
            <ProgressLabel>Directions</ProgressLabel>
            {fields.map((input, index) => {
                return (
                    <label key={index}>
                        {`Step ${index + 1}`}
                        <TextArea
                            type="text"
                            name={`directions[${index}]`}
                            ref={register}
                            style={{ height: "8rem" }}
                        />
                    </label>
                );
            })}
            <AddMore
                onClick={(e) => {
                    e.preventDefault();
                    append({ directions: "directions" });
                }}
            >
                Add More
            </AddMore>
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
    JWToken: state["authReducer"].JWToken,
    draftRecipe: state["recipeReducer"].draftRecipe,
    image: state["recipeReducer"].image,
});
export default connect(mapStateToProps)(CreateDirections);
