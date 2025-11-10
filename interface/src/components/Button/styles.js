import styled from "styled-components";

export const ContainerButton = styled.button`
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.theme.purple};
    color: #fff;
    font-size: 30px;
    font-family: 'Road Rage', sans-serif;

    &:hover {
        background-color: #6F357C;
        border: 1px dashed #fff;
    }

`