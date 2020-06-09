import React, { useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setDraftRecipe, uploadImage } from "../../recipeAction";
import { StyledForm, Submit } from "../../../StyledForm";
import { FormField, TextInput, Keyboard, Box } from "grommet";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import blankImage from "../../../images/blankimage.jpg";
const Dropzone = styled.section`
    margin: 1rem auto;
    width: 100%;
    height: 40%;
    border: 2px dashed black;
    padding: 2rem;
    text-align: center;
`;

const EditRecipeDetails = ({ recipe, JWToken }) => {
    let { recipeName, recipeDesc, servings, duration, img } = recipe;
    let duration_hour = Math.floor(duration / 60);
    let duration_mins = duration % 60;
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const [file, setFile] = useState(img);
    const [dropped, setDropped] = useState(false);

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
        isDragActive,
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles);
            setDropped(true);
        },
    });

    const filepath = acceptedFiles.map((file) => {
        Object.assign(file, {
            preview: URL.createObjectURL(file),
        });
        console.log(file.preview);
        return (
            // <li key={file.path} style={{ listStyle: "none" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    textAlign: "center",
                    padding: "0 2rem",
                }}
            >
                <img
                    src={file.preview}
                    style={{
                        width: "100px",
                        height: "100px",
                    }}
                />
                <p>{file.path}</p>
            </div>
            // </li>
        );
    });
    const onSubmit = (data) => {
        if (!dropped) {
            const updatedData = { ...data, img: img };
            dispatch(setDraftRecipe(updatedData));
        } else {
            dispatch(uploadImage(file, JWToken))
                .then((url) => {
                    const updatedData = { ...data, img: url };
                    dispatch(setDraftRecipe(updatedData));
                })
                .catch((err) => {
                    console.log(err, "no img");
                    return err;
                });
        }
    };
    const recipeNameRef = useRef();
    const recipeDescRef = useRef();
    const servingsRef = useRef();
    const hourRef = useRef();
    const minutesRef = useRef();

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
                            register(e, { pattern: "I cannot be empty" });
                            recipeNameRef.current = e;
                        }}
                        defaultValue={recipeName}
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
                        defaultValue={recipeDesc}
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
                        defaultValue={servings}
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
                                defaultValue={duration_hour}
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
                            defaultValue={duration_mins}
                        />
                    </FormField>

                    {errors["duration_mins"] && (
                        <p>{errors["duration_mins"].message}</p>
                    )}
                </Box>
            </Box>

            <Dropzone>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />

                    {dropped ? (
                        <div>{filepath}</div>
                    ) : (
                        <p>Drop or click to upload image</p>
                    )}
                </div>
            </Dropzone>

            <div>
                <Submit type="submit" value="Submit">
                    Submit
                </Submit>
            </div>
        </StyledForm>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
});
export default connect(mapStateToProps)(EditRecipeDetails);
