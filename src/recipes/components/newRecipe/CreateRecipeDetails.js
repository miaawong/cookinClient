import React, { useRef, useState, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setDraftRecipe, uploadImage } from "../../recipeAction";
import { StyledForm, Submit } from "../../../StyledForm";
import { TextInput, Box, FormField, Keyboard, TextArea } from "grommet";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import blankImage from "../../../images/blankimage.jpg";

const ImageUpload = styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: black;
    color: white;
    width: 100%;
    height: 10rem;
    text-align: center;
`;

const CreateRecipeDetails = ({ JWToken }) => {
    const { register, handleSubmit, errors } = useForm();
    const [file, setFile] = useState({});
    const [dropped, setDropped] = useState(false);
    console.log(dropped, "dropped");
    const onDrop = useCallback(
        (acceptedFiles, e) => {
            console.log(e, "e");
            console.log(acceptedFiles);
            setFile(acceptedFiles);
            setDropped(true);
        },
        [file]
    );

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
        isDragActive,
    } = useDropzone({
        onDrop,
    });

    const filepath = acceptedFiles.map((file) => {
        Object.assign(file, {
            preview: URL.createObjectURL(file),
        });

        return (
            <li key={file.path} style={{ listStyle: "none" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        textAlign: "center",
                    }}
                >
                    <img
                        src={file.preview}
                        style={{
                            width: "75px",
                            height: "75px",
                            objectFit: "contain",
                        }}
                    />
                    <p>{file.path}</p>
                </div>
            </li>
        );
    });

    const recipeNameRef = useRef();
    const recipeDescRef = useRef();
    const servingsRef = useRef();
    const hourRef = useRef();
    const minutesRef = useRef();

    const dispatch = useDispatch();
    const onSubmit = (data) => {
        if (!dropped) {
            console.log("no image uploaded");
            const updatedData = { ...data, img: blankImage };
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
    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
                            register(e, {
                                required: "Name is required",
                            });
                            recipeNameRef.current = e;
                        }}
                    ></TextInput>
                </FormField>
            </Keyboard>
            {errors["recipeName"] && <p>{errors["recipeName"].message}</p>}
            <FormField label="Description">
                <TextArea
                    type="text"
                    name="recipeDesc"
                    placeholder="Description"
                    ref={(e) => {
                        register(e);
                        recipeDescRef.current = e;
                    }}
                    style={{ height: "8rem" }}
                />
            </FormField>
            <Keyboard
                onEnter={(e) => {
                    e.preventDefault();
                    hourRef.current.focus();
                }}
            >
                <FormField label="Servings">
                    <TextInput
                        type="number"
                        name="servings"
                        placeholder="Servings"
                        ref={(e) => {
                            register(e);
                            servingsRef.current = e;
                        }}
                    />
                </FormField>
            </Keyboard>
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
                                    register(e);
                                    hourRef.current = e;
                                }}
                            />
                        </FormField>
                    </Keyboard>
                </Box>
                <Box direction="row-responsive" gap="small" align="center">
                    <FormField label="Minutes">
                        <TextInput
                            type="number"
                            name="duration_mins"
                            placeholder="Mins"
                            ref={(e) => {
                                register(e);
                            }}
                        />
                    </FormField>
                </Box>
            </Box>
            <div>
                <ImageUpload {...getRootProps()}>
                    <input {...getInputProps()} />

                    <p>Upload Image</p>
                    <div>{filepath}</div>
                </ImageUpload>
            </div>

            <div>
                <Submit type="submit" value="Submit" name="Submit">
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
