import React, { useRef, useState, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setDraftRecipe, uploadImage } from "../../recipeAction";
import {
    StyledForm,
    Submit,
    TextInput,
    TextArea,
    HourMinute,
    ImageUpload,
    ProgressLabel,
} from "../StyledForm";
import { useDropzone } from "react-dropzone";
import blankImage from "../../../images/blankimage.jpg";

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
            const updatedData = { ...data, img: blankImage };
            dispatch(setDraftRecipe(updatedData));
        } else {
            dispatch(uploadImage(file, JWToken))
                .then((url) => {
                    const updatedData = { ...data, img: url };
                    dispatch(setDraftRecipe(updatedData));
                })
                .catch((err) => {
                    return err;
                });
        }
    };
    console.log(errors);
    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <ProgressLabel>Details</ProgressLabel>
            <label>
                Name
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
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            recipeDescRef.current.focus();
                        }
                    }}
                />
            </label>
            {errors["recipeName"] && <p>{errors["recipeName"].message}</p>}
            <label>
                Description
                <TextArea
                    type="text"
                    name="recipeDesc"
                    placeholder="Description"
                    ref={(e) => {
                        register(e);
                        recipeDescRef.current = e;
                    }}
                    style={{ height: "8rem" }}
                    // cannot keypress cause it's textarea
                />
            </label>
            <label>
                Servings
                <TextInput
                    type="number"
                    name="servings"
                    placeholder="Servings"
                    ref={(e) => {
                        register(e, {
                            pattern: /^[0-9]*$/,
                        });
                        servingsRef.current = e;
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            hourRef.current.focus();
                        }
                    }}
                />
            </label>

            {errors["servings"] && <p>{errors["servings"].message}</p>}
            <HourMinute>
                <label>
                    Hour
                    <TextInput
                        type="number"
                        name="duration_hour"
                        placeholder="Hour"
                        ref={(e) => {
                            register(e);
                            hourRef.current = e;
                        }}
                        style={{ width: "90%" }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                minutesRef.current.focus();
                            }
                        }}
                    />
                </label>

                <label>
                    Minutes
                    <TextInput
                        type="number"
                        name="duration_mins"
                        placeholder="Mins"
                        ref={(e) => {
                            register(e);
                            minutesRef.current = e;
                        }}
                        style={{ width: "90%" }}
                    />
                </label>
            </HourMinute>
            <div>
                <ImageUpload {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop or click to upload image</p>
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
