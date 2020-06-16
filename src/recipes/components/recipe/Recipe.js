import React from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as recipeActionTypes from "../../recipeActionTypes";
import { deleteRecipe } from "../../recipeAction";
import { FaTrash, FaEdit } from "react-icons/fa";
import { device } from "../../../Theme";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeRecipe, unlikeRecipe } from "../../recipeAction";

const Main = styled.div`
    font-family: ${(props) => props.theme.font};
    width: 100%;
    display: flex;
    margin-bottom: 5rem;
    flex-direction: column;

    @media ${device.laptop} {
        width: 95%;
    }

    @media ${device.wide} {
        width: 97%;
    }
`;
const Description = styled.div`
    width: 100%;
    height: 100%;
    font-size: ${(props) => props.theme.fontSizes.small};
    padding: 1rem;
    background: ${(props) => props.theme.colors.yellow};
    order: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media ${device.ipad}, ${device.laptop}, ${device.wide} {
        font-size: ${(props) => props.theme.fontSizes.medium};
        padding: 2rem;
    }
`;
const Middle = styled.div`
    width: 100%;
    height: 100%;
    align-self: center;
    padding: 1rem;
    order: 3;
    font-size: ${(props) => props.theme.fontSizes.small};
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > p {
        margin: 0.5rem 0;
    }
    @media ${device.ipad}, ${device.laptop}, ${device.wide} {
        padding: 2rem;
        font-size: ${(props) => props.theme.fontSizes.medium};
    }
`;

const ImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    order: 1;
    justify-content: center;
`;
const Image = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
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
    text-align: center;
    font-weight: 800;
    font-size: ${(props) => props.theme.fontSizes.XL};
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.large};
    }
    @media ${device.small}, ${device.medium}, ${device.large}, ${device.ipad} {
        text-align: center;
    }
`;
const Category = styled.h2`
    margin: 1rem 0 0.5rem 0;
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: 600;
`;
const BottomDesc = styled.div`
    margin: 2rem 0 0 0;
    & > div > p {
        margin: 0;
        font-weight: 600;
        font-size: ${(props) => props.theme.fontSizes.small};
    }
    & > ul {
        margin: 0 auto;
    }
`;
const FavoriteBtn = styled.button`
    position: absolute;
    right: 1rem;
    top: 1rem;
    background: none;
    border: none;
`;
const Recipe = ({ currentRecipe, JWToken, userId, loggedIn }) => {
    let dispatch = useDispatch();
    let history = useHistory();
    const {
        _id,
        recipeName,
        recipeDesc,
        servings,
        duration,
        ingredients,
        directions,
        img,
        createdOn,
        creator,
        likes,
    } = currentRecipe;

    let capCreator = "";
    if (!creator) {
        return "";
    } else {
        capCreator = creator.charAt(0).toUpperCase() + creator.slice(1);
    }
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

    return (
        <Main loggedIn={loggedIn}>
            <Description>
                <RecipeName>{recipeName}</RecipeName>

                <span
                    style={{
                        textAlign: "center",
                    }}
                >
                    {recipeDesc}
                </span>
                <BottomDesc>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        <p>Serves {servings}</p>

                        <p>
                            Time: {duration_hour}hr {duration_mins}mins
                        </p>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        <p>
                            {createdMonth} {createdYear}
                        </p>
                        <p>Created By {capCreator}</p>
                    </div>
                    <Category>Ingredients</Category>
                    <ul>
                        {ingredients &&
                            ingredients.map((ingredient, index) => (
                                <li key={index} style={{ listStyle: "none" }}>
                                    {ingredient.amount} {ingredient.unit.value}{" "}
                                    {ingredient.ingName}
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
                </BottomDesc>
            </Description>
            <Middle>
                <Category>Directions</Category>
                {directions &&
                    directions.map((step, index) => (
                        <p key={index}> - {step}</p>
                    ))}
            </Middle>
            <ImgContainer>
                <Image
                    alt={recipeName}
                    src={img}
                    style={{ position: "relative" }}
                />

                {likes.indexOf(userId) === -1 ? (
                    <FavoriteBtn
                        onClick={() => dispatch(likeRecipe(_id, JWToken))}
                    >
                        <FaRegHeart
                            style={{
                                position: "absolute",
                                right: "1rem",
                                top: "7rem",
                            }}
                            size={30}
                        />
                    </FavoriteBtn>
                ) : (
                    <FavoriteBtn
                        onClick={() => dispatch(unlikeRecipe(_id, JWToken))}
                    >
                        <FaHeart
                            style={{
                                color: "#FB170A",
                                position: "absolute",
                                right: "1rem",
                                top: "7rem",
                            }}
                            size={30}
                        />
                    </FavoriteBtn>
                )}
            </ImgContainer>
        </Main>
    );
};

export default Recipe;
