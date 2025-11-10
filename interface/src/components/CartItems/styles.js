import styled from "styled-components";

export const ProductImage = styled.img`
    height: 80px;
    border-radius: 16px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background-color: ${props => props.theme.purple};

        &:hover {
            background-color: #6f357c;
        }
    }
`;

export const EmptyCart = styled.p`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;

export const ProductTotalPrice = styled.p`
    font-weight: bold;
`;
