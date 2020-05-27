import React from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import EditRecipe from "../updateRecipe/EditRecipe";
import * as recipeActionTypes from "../../recipeActionTypes";
import { deleteRecipe } from "../../recipeAction";
import { FaTrash, FaEdit } from "react-icons/fa";
import { device } from "../../../Theme";

const Main = styled.div`
    font-family: ${(props) => props.theme.font};
    width: 90%;
    margin: 0 auto 4rem auto;
    border: 5px solid #000000;
    display: flex;
    flex-direction: column;

    @media ${device.laptop}, ${device.desktop} {
        margin: 0 6rem 0 auto;
        flex-direction: row;
    }
`;
const Description = styled.div`
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.small};
    padding: 1rem;
    background: ${(props) => props.theme.colors.yellow};
    @media ${device.laptop}, ${device.desktop} {
        width: 25%;
    }
`;
const Middle = styled.div`
    align-self: center;
    padding: 1rem;
    font-size: ${(props) => props.theme.fontSizes.small};
    @media ${device.laptop}, ${device.desktop} {
        width: 35%;
    }
`;

const ImgContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 1rem;
    @media ${device.laptop}, ${device.desktop} {
        width: 40%;
    }
`;
const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 50%;
`;
const Modification = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const Button = styled.button`
    background: none;
    padding: 0.5rem;
    border: none;
`;
const Recipe = ({ currentRecipe, edit, JWToken }) => {
    let dispatch = useDispatch();

    let history = useHistory();
    let {
        _id,
        recipeName,
        recipeDesc,
        servings,
        duration,
        ingredients,
        directions,
        img,
        createdOn,
    } = currentRecipe;

    let duration_hour = Math.floor(duration / 60);
    let duration_mins = duration % 60;

    if (edit) {
        return <EditRecipe />;
    } else if (currentRecipe) {
        return (
            <Main>
                <Description>
                    <h1>{recipeName}</h1>
                    <p>{recipeDesc}</p>
                    <p>Servings: {servings}</p>
                    <p>
                        Time: {duration_hour} hr {duration_mins} mins
                    </p>
                    <h3>Ingredients</h3>
                    <ul>
                        {ingredients &&
                            ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.ingName} - {ingredient.amount}{" "}
                                    {ingredient.unit}
                                </li>
                            ))}
                    </ul>
                </Description>
                <Middle>
                    <h2>Directions:</h2>
                    {directions &&
                        directions.map((step, index) => (
                            <p key={index}>
                                Step {index + 1}: {step}
                            </p>
                        ))}
                </Middle>

                <ImgContainer>
                    <Modification>
                        <Button
                            onClick={() => {
                                dispatch({
                                    type: recipeActionTypes.EDIT_STATE,
                                    payload: true,
                                });
                            }}
                        >
                            <FaEdit size={22} />
                        </Button>
                        <Button
                            onClick={() => {
                                dispatch(deleteRecipe(_id, JWToken, history));
                            }}
                        >
                            <FaTrash size={20} />
                        </Button>
                    </Modification>
                    <Image alt={recipeName} src={img} />
                    <p style={{ textAlign: "right" }}>{createdOn}</p>
                </ImgContainer>
            </Main>
        );
    }
};

const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    edit: state["recipeReducer"].edit,
    JWToken: state["authReducer"].JWToken,
});
export default connect(mapStateToProps)(Recipe);
