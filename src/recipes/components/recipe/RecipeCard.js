import React from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../../Theme";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Main = styled.div`
    font-family: ${(props) => props.theme.font};
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;

    @media ${device.full} {
        margin: 0 6rem 0 2rem;
    }
`;

const CardBox = styled.div`
    background: #f8f8f8;
    margin: ${({ recipes }) => (recipes.length === 1 ? "5px 0" : "5px auto")};
    width: 40rem;
    height: 32rem;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    @media ${device.small} {
        width: 22rem;
        height: 28rem;
    }
    @media ${device.full} {
        flex-wrap: ${({ recipes }) =>
            recipes.length === 1 ? "nowrap" : "wrap"};
    }
    & > * {
        flex: 2 1;
    }
`;
const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 65%;
    @media ${device.full} {
        width: ${({ recipes }) => (recipes.length === 1 ? "65%" : "100%")};
        height: ${({ recipes }) => (recipes.length === 1 ? "100%" : "64%")};
    }
`;

const Description = styled.div`
    padding: 1rem 1rem 0 1rem;
    height: 35%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;

    flex: 1 1 auto;
    & > h1 {
        margin: 0;
        font-size: ${(props) => props.theme.fontSizes.large};
    }
`;

const RecipeCard = ({ recipes }) => {
    let card = recipes.map((recipe) => {
        const { img, recipeName, recipeDesc, duration } = recipe;
        return (
            <CardBox recipes={recipes}>
                <Image src={img} recipes={recipes} />
                <FaRegHeart
                    style={{
                        position: "absolute",
                        color: "white",
                        right: "1rem",
                        top: "1rem",
                    }}
                    size={30}
                />
                {/* onclick change icon to <FaHeart/> */}

                <Description>
                    <div style={{ width: "100%" }}>
                        <h1>{recipeName}</h1>
                        <p>1hr 30mins</p>
                    </div>
                </Description>
                <p>{recipeDesc}</p>
            </CardBox>
        );
    });
    return <Main>{card}</Main>;
};

export default RecipeCard;
