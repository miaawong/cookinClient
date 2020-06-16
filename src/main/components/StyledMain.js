import React from "react";
import styled from "styled-components";
import { theme, device } from "../../Theme";
export const Main = styled.div`
    font-family: ${(props) => props.theme.font};
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 4rem;
    @media ${device.laptop}, ${device.wide} {
        margin: ${({ loggedIn }) => (loggedIn ? "0 4rem 0 2rem" : "0 auto")};
        width: 92%;
        height: 88%;
    }

    flex-wrap: wrap;
    justify-content: start;
`;
