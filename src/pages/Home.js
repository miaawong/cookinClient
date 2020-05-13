import React from "react";
import styled from "styled-components";
import pasta from "../images/Creamy-Salmon-Pasta-with-Spinach-2.jpg";
const Main = styled.div`
    display: flex;
    height: 100%;
    border: 2px solid red;
`;
const Box = styled.div`
    display: flex;
    background: white;
    border: 5px solid black;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    height: 80%;
    width: 90%;
`;
const MainText = styled.div`
    font-family: ${(props) => props.theme.font};
    background: white;
    flex-grow: 4;
    width: 50%;
    height: 100%;
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
export default function Home() {
    return (
        // <Main>
        <Box>
            <MainText>
                <h1>What's are you cookin' for dinner? </h1>
                <h1>Get inspired, </h1>
                <h1>Store your recipes,</h1>
                <h1>All in one place.</h1>
            </MainText>
            <Yellow>
                <MainImg src={pasta} />
            </Yellow>
        </Box>
        // </Main>
    );
}
