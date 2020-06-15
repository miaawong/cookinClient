import styled from "styled-components";
import { device, theme } from "../../Theme";

export const StyledForm = styled.form`
    width: 80%;
    height: 100%;
    margin: 0 auto;
    font-family: ${(props) => props.theme.font};
    font-size: ${theme.fontSizes.medium};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-content: flex-start;
    overflow: auto;
    @media ${device.laptop}, ${device.desktop}, ${device.wide} {
        margin: 0 auto 0 6rem;
    }

    & > p {
        margin: 0;
        padding: -1rem 0 0 0;
        font-size: 16px;
        color: #ff0000;
    }
    & > div {
        margin: 0.5rem 0;
    }
`;
export const TextInput = styled.input`
    font-size: ${(props) => props.theme.fontSizes.medium};
    margin: 0.5rem 0;
    width: 100%;
    height: 3rem;
    padding: 0.5rem;
    border: 1px solid black;
`;
export const TextArea = styled.textarea`
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-family: ${(props) => props.theme.font};
    margin: 0.5rem 0;
    width: 100%;
    height: 6rem;
    padding: 0.5rem;
    border: 1px solid black;
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

export const HourMinute = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ImageUpload = styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: black;
    color: white;
    width: 100%;
    height: 15rem;
    text-align: center;
`;
