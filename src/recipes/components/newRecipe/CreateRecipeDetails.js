import React, { useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setDraftRecipe, uploadImage } from "../../recipeAction";
import { StyledForm, Submit } from "../../../StyledForm";
import { TextInput, Box, FormField, Keyboard } from "grommet";
import Dropzone from "react-dropzone";

const CreateRecipeDetails = ({ JWToken }) => {
    const { register, handleSubmit, errors } = useForm();
    const [newFile, setNewFile] = useState({});
    const recipeNameRef = useRef();
    const recipeDescRef = useRef();
    const servingsRef = useRef();
    const hourRef = useRef();
    const minutesRef = useRef();

    const dispatch = useDispatch();
    const onSubmit = (data) => {
        dispatch(uploadImage(newFile, JWToken))
            .then((url) => {
                const updatedData = { ...data, img: url };
                dispatch(setDraftRecipe(updatedData));
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    };
    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <h1>Details</h1>
            <Keyboard
                onEnter={(e) => {
                    e.preventDefault();
                    recipeDescRef.current.focus();
                }}
            >
                <FormField label="Name">
                    <TextInput
                        type="text"
                        name="recipeName"
                        placeholder="Recipe Name"
                        ref={(e) => {
                            register(e);
                            recipeNameRef.current = e;
                        }}
                    ></TextInput>
                </FormField>
            </Keyboard>
            {errors["recipeName"] && <p>{errors["recipeName"].message}</p>}
            <Keyboard
                onEnter={(e) => {
                    e.preventDefault();
                    servingsRef.current.focus();
                }}
            >
                <FormField label="Description">
                    <TextInput
                        type="text"
                        name="recipeDesc"
                        placeholder="Description"
                        ref={(e) => {
                            register(e);
                            recipeDescRef.current = e;
                        }}
                    />
                </FormField>
            </Keyboard>
            {errors["recipeDesc"] && <p>{errors["recipeDesc"].message}</p>}
            <Keyboard
                onEnter={(e) => {
                    e.preventDefault();
                    hourRef.current.focus();
                }}
            >
                <FormField label="Servings">
                    <TextInput
                        type="text"
                        name="servings"
                        placeholder="Servings"
                        ref={(e) => {
                            register(e, {
                                pattern: {
                                    value: /^(0|[1-9][0-9]*)$/,
                                    message: "must be a number",
                                },
                            });
                            servingsRef.current = e;
                        }}
                    />
                </FormField>
            </Keyboard>
            {errors["servings"] && <p>{errors["servings"].message}</p>}

            <Box
                direction="row-responsive"
                gap="large"
                justify="start"
                align="center"
                pad={{ right: "small" }}
            >
                <Box direction="row-responsive" gap="small" align="center">
                    <Keyboard
                        onEnter={(e) => {
                            e.preventDefault();
                            minutesRef.current.focus();
                        }}
                    >
                        <FormField label="Hour">
                            <TextInput
                                type="number"
                                name="duration_hour"
                                placeholder="Hour"
                                ref={(e) => {
                                    register(e, {
                                        pattern: {
                                            value: /^(0|[1-9][0-9]*)$/,
                                            message: "must be a number",
                                        },
                                    });
                                    hourRef.current = e;
                                }}
                            />
                        </FormField>
                    </Keyboard>
                    {errors["duration_hour"] && (
                        <p style={{ padding: 0, margin: 0 }}>
                            {errors["duration_hour"].message}
                        </p>
                    )}
                </Box>
                <Box direction="row-responsive" gap="small" align="center">
                    <Keyboard
                        onEnter={(e) => {
                            e.preventDefault();
                            // imageRef.current.focus();
                        }}
                    >
                        <FormField label="Minutes">
                            <TextInput
                                type="number"
                                name="duration_mins"
                                placeholder="Mins"
                                ref={(e) => {
                                    register(e, {
                                        pattern: {
                                            value: /^(0|[1-9][0-9]*)$/,
                                            message: "must be a number",
                                        },
                                    });
                                    minutesRef.current = e;
                                }}
                            />
                        </FormField>
                    </Keyboard>

                    {errors["duration_mins"] && (
                        <p>{errors["duration_mins"].message}</p>
                    )}
                </Box>
            </Box>

            <FormField label="Image">
                <Dropzone
                    onDrop={(acceptedFiles) => {
                        setNewFile(acceptedFiles);
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>
                                    Drag 'n' drop some files here, or click to
                                    select files
                                </p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </FormField>
            <div>
                <Submit type="submit" value="Submit">
                    {" "}
                    Submit
                </Submit>
            </div>
        </StyledForm>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
});
export default connect(mapStateToProps)(CreateRecipeDetails);
