import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { createRecipe } from "../redux/recipes/recipeAction";

const CreateDirections = ({ JWToken, newRecipe }) => {
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
        newRecipe.directions = data.directions;
        dispatch(createRecipe(JWToken, newRecipe, history));
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                directions
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
                            <input
                                type="text"
                                name={`directions[${index}]`}
                                ref={register}
                            />
                        </label>
                    );
                })}
                <br></br>
                <input type="submit" />
            </form>
            //{" "}
            {/* {errors["instructions"] && (
            //             <p>{errors["instructions"].message}</p>
            //         )} */}
            //{" "}
            {/* <br></br>
            // {errors["img"] && <p>{errors["img"].message}</p>}
            // <input type="submit" />  */}
        </div>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    newRecipe: state["recipeReducer"].newRecipe,
});
export default connect(mapStateToProps)(CreateDirections);
