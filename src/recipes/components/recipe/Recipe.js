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
    width: 100%;
    margin: 0 auto 4rem auto;

    display: flex;
    flex-direction: column;

    @media ${device.laptop}, ${device.wide} {
        width: 90%;
        border: 5px solid #000000;
        margin: 0 6rem 0 auto;
        flex-direction: row;
    }
`;
const Description = styled.div`
    width: 100%;

    font-size: ${(props) => props.theme.fontSizes.small};
    padding: 1rem;
    background: ${(props) => props.theme.colors.yellow};
    order: 2;

    @media ${device.ipad}, ${device.laptop}, ${device.wide} {
        width: 25%;
        order: 0;
    }

    & > p {
        margin: 0;
        font-weight: 700;
    }
    & > div > p {
        margin: 0;
        font-weight: 700;
    }
`;
const Middle = styled.div`
    width: 100%;
    height: 100%;
    align-self: center;
    padding: 1rem;
    font-size: ${(props) => props.theme.fontSizes.small};
    order: 3;
    @media ${device.laptop}, ${device.wide} {
        width: 35%;
    }
    @media ${device.ipad}, ${device.laptop}, ${device.wide} {
        order: 0;
    }
`;

const ImgContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 100%;
    order: 1;

    @media ${device.ipad}, ${device.laptop}, ${device.wide} {
        width: 40%;
        padding: 1rem;
        order: 0;
    }
`;
const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    @media ${device.ipad}, ${device.laptop}, ${device.wide} {
        height: 50%;
    }
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
const RecipeName = styled.h1`
    font-size: 30px;
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

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let month = new Date(createdOn);
    let createdMonth = months[month.getMonth()];
    let createdYear = new Date(createdOn).getFullYear();

    if (edit) {
        return <EditRecipe />;
    } else if (currentRecipe) {
        return (
            <Main>
                <Description>
                    <RecipeName style={{ margin: "0 auto" }}>
                        {recipeName}
                    </RecipeName>

                    <p> Serves {servings} people </p>
                    <span
                        style={{
                            display: "inline-block",
                            textAlign: "center",
                            margin: "2rem 0",
                        }}
                    >
                        {recipeDesc}
                    </span>

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            height: "1rem",
                        }}
                    >
                        <p style={{ textAlign: "left" }}>
                            Time: {duration_hour} hr {duration_mins} mins
                        </p>
                        <p
                            style={{
                                textAlign: "right",
                            }}
                        >
                            {createdMonth} {createdYear}
                        </p>
                    </div>
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
                    <Image alt={recipeName} src={img} />
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
