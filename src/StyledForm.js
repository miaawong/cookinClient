import styled from "styled-components";
import { device } from "./Theme";
import { Grommet, Form, FormField, TextInput, Box } from "grommet";
export const StyledForm = styled(Form)`
    width: 80%;
    height: 100%;
    margin: 5rem auto 0 auto;
    font-family: ${(props) => props.theme.font};
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
    align-content: flex-start;
    overflow: auto;
    @media ${device.laptop}, ${device.desktop} {
        margin: 5rem auto 0 6rem;
    }

    & > p {
        margin: 0;
        padding: -1rem 0 0 0;
        font-size: 16px;
        color: #ff0000;
    }
    & > div {
        margin: 1rem 0;
    }
`;
export const Submit = styled.button`
    font-family: ${(props) => props.theme.font};
    font-size: 26px;
    width: 8rem;
    height: auto;
    background: black;
    color: white;
    padding: 0.5rem;
    float: right;
    border: none;
`;
