import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ImageProduct = styled.img`
    height: 80px;
    padding: 12px;
    border-radius: 16px;
`;

export const EditButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.darkWhite};
    border: 0;
    border-radius: 8px;
    height: 32px;
    width: 32px;
    margin: 0 auto;

    &:hover {
        background-color: ${(props) => props.theme.purple};
    }
`;