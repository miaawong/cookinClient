import React from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setDraftRecipe } from "../../recipeAction";
import { Grommet, Form, FormField, TextInput } from "grommet";
const grommetTheme = {
    global: {
        font: {
            family: "Roboto",
            size: "24px",
        },
        colors: {
            focus: "#ffda0b",
        },
    },
};

const CreateRecipeDetails = ({}) => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        dispatch(setDraftRecipe(data));
    };
    return (
        <Grommet full theme={grommetTheme}>
            <Form
                pad="large"
                style={{
                    width: "80%",
                    height: "80%",
                    margin: "0 auto",
                    fontFamily: `${(props) => props.theme.font}`,
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
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
                    placeholder="servings"
                    ref={register({
                        pattern: {
                            value: /^(0|[1-9][0-9]*)$/,
                            message: "must be a number",
                        },
                    })}
                />
                <br></br>
                {errors["servings"] && <p>{errors["servings"].message}</p>}

                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <TextInput
                        style={{ width: "90%", marginRight: "1rem" }}
                        type="number"
                        name="duration_hour"
                        placeholder="hour"
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
                        style={{ width: "90%", marginLeft: "1rem" }}
                        type="number"
                        name="duration_mins"
                        placeholder="mins"
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
                </div>
                <br></br>
                <TextInput
                    type="text"
                    name="img"
                    placeholder="Image"
                    ref={register}
                />
                <br></br>
                <input type="submit" />
            </Form>
        </Grommet>
    );
};

// const mapStateToProps = (state) => {};
export default CreateRecipeDetails;
