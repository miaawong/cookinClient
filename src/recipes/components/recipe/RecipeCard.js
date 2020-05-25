import React from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getCurrentRecipe } from "../../recipeAction";

const Main = styled.div`
    margin: 2rem 6rem 2rem 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const CardBox = styled.div`
    border: 2px solid black;
    width: 30rem;
    height: 50rem;
    margin: 1rem;
    flex: 1 1 30rem;
`;
const Image = styled.img`
    width: 100%;
    height: 70%;
    object-fit: cover;
`;
const Description = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const RecipeCard = ({ recipes }) => {
    console.log(recipes, "recipes");
    const { img, recipeName, recipeDesc, duration } = recipes.map((recipe) => {
        return recipe;
    });
    console.log(img, "img");
    return (
        <Main>
            <CardBox>
                <Image src={img} />
                <Description>
                    <h1>{recipeName}</h1>
                </Description>
            </CardBox>
        </Main>
    );
};

export default RecipeCard;
