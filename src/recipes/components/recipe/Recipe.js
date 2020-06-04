import React from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import EditRecipe from "../../../pages/EditRecipe";
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
    @media ${device.large}, ${device.ipad} {
        margin: 0 auto 5rem auto;
    }
    @media ${device.laptop}, ${device.wide} {
        height: 85%;
        width: 90%;
        border: 5px solid #000000;
        margin: 0 6rem 0 auto;
        flex-direction: row;
    }
    @media ${device.wide} {
        margin: 0 8rem 0 auto;
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
    }
    @media ${device.laptop}, ${device.wide} {
        width: 30%;
        order: 0;
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
        font-size: ${(props) => props.theme.fontSizes.medium};
    }
    @media ${device.laptop}, ${device.wide} {
        width: 30%;
        order: 0;
    }
`;

const ImgContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    order: 1;
    justify-content: center;

    @media ${device.laptop}, ${device.wide} {
        width: 40%;
        padding: 1rem;
        order: 0;
    }
`;
const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    @media ${device.laptop}, ${device.wide} {
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
                            <p style={{ width: "100%" }}>Serves {servings}</p>

                            <p>
                                Time: {duration_hour}hr {duration_mins}mins
                            </p>
                            <p
                                style={{
                                    textAlign: "right",
                                }}
                            >
                                {createdMonth} {createdYear}
                            </p>
                        </div>
                        <Category>Ingredients</Category>
                        <ul>
                            {ingredients &&
                                ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.amount} {ingredient.unit}{" "}
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
                                    dispatch(
                                        deleteRecipe(_id, JWToken, history)
                                    );
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
