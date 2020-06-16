import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
    exploreRecipes,
    getCurrentRecipe,
    likeRecipe,
    unlikeRecipe,
} from "../recipes/recipeAction";
import styled from "styled-components";
import { device } from "../Theme";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Main } from "../main/components/StyledMain";

const CardBox = styled.div`
    background: #f8f8f8;
    margin: ${({ recipes }) =>
        recipes.length === 1 ? "1rem auto" : "1rem auto"};
    width: 38rem;
    height: 28rem;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    box-shadow: 5px 5px 5px 0px rgba(230, 230, 230, 1);
    /* justify-content: flex-start; */
    align-content: flex-start;

    @media ${device.laptop}, ${device.wide} {
        width: 27rem;
        height: 25rem;

        flex-wrap: ${({ recipes }) =>
            recipes.length === 1 ? "nowrap" : "wrap"};
    }
`;
const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 65%;
`;

const DescriptionBox = styled.div`
    padding: 0 1rem;
    width: 100%;
    height: 35%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: left;
    align-content: flex-start;
    justify-content: center;
    font-size: ${(props) => props.theme.fontSizes.small};
    text-align: center;
    @media ${device.laptop}, ${device.wide} {
        /* height: 45%; */
    }
`;
const RecipeName = styled.h1`
    width: 100%;
    margin: 0%;
    font-weight: 800;
    font-size: ${(props) => props.theme.fontSizes.large};
`;

const Description = styled.p`
    margin: 0.5rem 0 1rem 0;
`;

const StyledLink = styled.button`
    color: #ffffff;
    width: 5rem;
    line-height: 2rem;
    background: black;
    padding: 2px;
    text-align: center;
    margin: 0 auto;
    border: none;

    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.73);
    text-decoration: none;
    cursor: pointer;

    & > label {
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
`;

const FavoriteBtn = styled.button`
    position: absolute;
    right: 1rem;
    top: 1rem;
    background: none;
    border: none;
`;
const Explore = ({ JWToken, userId, recipes, loggedIn }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(exploreRecipes());
        // return () => {
        //     cleanup;
        // };
    }, []);
    let history = useHistory();
    let card = recipes.map((recipe) => {
        const { img, recipeName, recipeDesc, likes, _id } = recipe;
        return (
            <CardBox recipes={recipes} key={_id}>
                <Image src={img} recipes={recipes} />
                {likes.indexOf(userId) === -1 ? (
                    <FavoriteBtn
                        onClick={() => dispatch(likeRecipe(_id, JWToken))}
                    >
                        <FaRegHeart
                            style={{
                                position: "absolute",
                                right: "1rem",
                                top: "1rem",
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
                                color: "#FFDA0B",

                                position: "absolute",
                                right: "1rem",
                                top: "1rem",
                            }}
                            size={30}
                        />
                    </FavoriteBtn>
                )}
                <DescriptionBox>
                    <RecipeName>{recipeName}</RecipeName>
                    <Description>
                        {recipeDesc.length > 40
                            ? `${recipeDesc.substr(0, 40)}...`
                            : recipeDesc}
                    </Description>
                    <StyledLink
                        onClick={() => {
                            dispatch(
                                getCurrentRecipe(recipe._id, JWToken, history)
                            );
                        }}
                    >
                        <label>Recipe</label>
                    </StyledLink>
                </DescriptionBox>
            </CardBox>
        );
    });
    return <Main loggedIn={loggedIn}>{card}</Main>;
};
const mapStateToProps = (state) => ({
    userId: state["authReducer"].id,
    JWToken: state["authReducer"].JWToken,
    recipes: state["recipeReducer"].recipes,
});

export default connect(mapStateToProps)(Explore);
