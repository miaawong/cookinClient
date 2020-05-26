import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pasta from "../images/Creamy-Salmon-Pasta-with-Spinach-2.jpg";
import { device } from "../Theme";

const Box = styled.div`
    display: flex;
    background: white;
    border: 5px solid black;
    justify-content: center;
    align-content: center;
    margin: ${({ loggedIn }) => (loggedIn ? "0 6em 0 auto" : "0 auto")};
    height: 80%;
    width: 90%;
    align-items: center;
    @media ${device.small} {
        flex-direction: column;
        border: none;
        margin: 0;
        width: 100%;
        height: 58%;
        position: fixed;
    }
    @media ${device.medium} {
        flex-direction: column;
        border: none;
        margin: 0;
        width: 100%;
        height: 58%;
        position: fixed;
    }
    @media ${device.large} {
        flex-direction: column;
        border: none;
        margin: 0;
        width: 100%;
        height: 52%;
        position: fixed;
    }
    @media ${device.ipad} {
        flex-direction: column;
        border: none;
        margin: 0;
        width: 100%;
        height: 52%;
        position: fixed;
    }
`;
const MainText = styled.div`
    font-family: ${(props) => props.theme.font};
    background: white;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    align-content: center;
    padding: 2rem;

    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
        width: 100%;
        position: fixed;
        bottom: 3rem;
        height: 28%;
        background: #ffda0b;
    }
    @media ${device.medium} {
        font-size: ${(props) => props.theme.fontSizes.medium};
        width: 100%;
        position: fixed;
        bottom: 3rem;
        height: 28%;
        background: #ffda0b;
        padding: 1rem 2rem;
    }
    @media ${device.large} {
        font-size: ${(props) => props.theme.fontSizes.large};
        width: 100%;
        position: fixed;
        bottom: 3rem;
        height: 35%;
        background: #ffda0b;
        padding: 3rem 2rem;
    }
    @media ${device.ipad} {
        font-size: ${(props) => props.theme.fontSizes.large};
        width: 100%;
        position: fixed;
        bottom: 10.8rem;
        height: 28%;
        background: #ffda0b;
        padding: 3rem 2rem;
    }
`;

const RecipesBtn = styled.label`
    font-size: ${(props) => props.theme.fontSizes.medium};
    text-decoration: none;
    color: white;
    background: black;
    margin: 2em 0;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    width: 18%;

    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
        width: 25%;
        margin: 1.5rem auto 0 auto;
    }
    @media ${device.medium} {
        font-size: ${(props) => props.theme.fontSizes.medium};
        margin: 2rem auto 0 auto;
    }
    @media ${device.large} {
        font-size: ${(props) => props.theme.fontSizes.medium};
        margin: 0 auto;
    }
`;
const Yellow = styled.div`
    background: #ffda0b;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${device.small} {
        width: 100%;
        background: white;
        height: 100%;
        justify-content: initial;
        align-items: initial;
    }
    @media ${device.medium} {
        width: 100%;
        background: white;
        height: 100%;
        justify-content: initial;
        align-items: initial;
    }
    @media ${device.large} {
        width: 100%;
        background: white;
        height: 100%;
        justify-content: initial;
        align-items: initial;
    }
`;
const MainImg = styled.img`
    width: 90%;
    max-height: 90%;
    object-fit: cover;
    @media ${device.small} {
        width: 100%;
        max-height: 100%;
    }
    @media ${device.medium} {
        width: 100%;
        max-height: 100%;
    }
    @media ${device.large} {
        width: 100%;
        max-height: 100%;
    }
`;
const Text = styled.p`
    font-size: ${(props) => props.theme.fontSizes.large};
    margin: 0.2em;
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
        margin: 0.2em;
    }
    @media ${device.medium} {
        font-size: ${(props) => props.theme.fontSizes.medium};
        margin: 0.1em;
    }
    @media ${device.large} {
        margin: 0;
    }
    @media ${device.ipad} {
        /* font-size: ${(props) => props.theme.fontSizes.medium}; */
        margin: 0;
    }
`;
export default function Home({ loggedIn }) {
    console.log(loggedIn);
    return (
        <Box loggedIn={loggedIn}>
            <MainText>
                <Text>What's are you cookin' for dinner? </Text>
                <Text>Get inspired, </Text>
                <Text>Store your recipes,</Text>
                <Text>All in one place.</Text>
                <RecipesBtn>
                    <Link to="/recipes" />
                    Recipes
                </RecipesBtn>
            </MainText>

            <Yellow>
                <MainImg src={pasta} />
            </Yellow>
        </Box>
    );
}
