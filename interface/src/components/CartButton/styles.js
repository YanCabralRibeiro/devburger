import styled from "styled-components";

export const ContainerButton = styled.div`
    background-color: ${props => props.theme.purple};
    border-radius: 8px;
    height: 50px;
    width: 100%;
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
        background-color: #6f357c;
    }

    img {
        margin: auto;
    }
`;