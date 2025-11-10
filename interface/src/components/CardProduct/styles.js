import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 20px;
    border-radius: 28px;
    background-color: #fff;
    position: relative;

    div {
        height: 80px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
    }

    p {
        color: #FF8C05;
        font-size: 18px;
        font-weight: 700;
        line-height: 20px;
        margin-top: 40px;
    }

    strong {
        color: #363636;
        font-size: 22px;
        font-weight: 700;
        line-height: 20px;
    }
`;

export const CardImage = styled.img`
    height: 100px;
    position: absolute;
    top: -50px;
`;