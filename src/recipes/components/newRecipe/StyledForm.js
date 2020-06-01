import styled from "styled-components";
import { Grommet, Form, FormField, TextInput, Box } from "grommet";
import { device } from "../../../Theme";
export const StyledForm = styled(Form)`
    width: 80%;
    height: 90%;
    margin: 0 auto;
    font-family: ${(props) => props.theme.font};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-content: flex-start;

    @media ${device.laptop}, ${device.desktop} {
        margin: 0 auto 0 6rem;
    }
    position: relative;
`;
export const Submit = styled.button`
    font-family: ${(props) => props.theme.font};
    font-size: 26px;
    width: 8rem;
    height: auto;
    background: black;
    color: white;
    padding: 1rem;
    float: right;
    border: none;
`;
