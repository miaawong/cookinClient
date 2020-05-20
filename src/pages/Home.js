import React from "react";
import styled from "styled-components";
import pasta from "../images/Creamy-Salmon-Pasta-with-Spinach-2.jpg";

const Box = styled.div`
    display: flex;
    background: white;
    border: 5px solid black;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    height: 80%;
    width: 90%;
    align-items: center;
`;
const MainText = styled.div`
    font-family: ${(props) => props.theme.font};
    background: white;
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    padding: 2em;
`;
const Yellow = styled.div`
    background: #ffda0b;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MainImg = styled.img`
    width: 90%;
    max-height: 80%;
    object-fit: cover;
`;
const Text = styled.h1`
    margin: 0.2em;
`;
export default function Home() {
    return (
        <Box>
            <MainText>
                <Text>What's are you cookin' for dinner? </Text>
                <Text>Get inspired, </Text>
                <Text>Store your recipes,</Text>
                <Text>All in one place.</Text>
            </MainText>
            <Yellow>
                <MainImg src={pasta} />
            </Yellow>
        </Box>
    );
}
