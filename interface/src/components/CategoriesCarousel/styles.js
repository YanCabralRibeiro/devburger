import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    .carousel-item {
        margin: 0 10px;
    }

    .react-multiple-carousel__arrow--right {
        top: 30px;
        right: 2px
    }

    .react-multiple-carousel__arrow--left {
        top: 30px;
        left: 2px;
    }
`;

export const Title = styled.h2`
    font-size: 38px;
    font-weight: 800;
    color: ${props => props.theme.purple};
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin-top:20px;
    margin-bottom: 40px;

    &::after {
        content: "";
        position: absolute;
        left: calc(50% - 28px);
        bottom: 0;
        width: 56px;
        height: 4px;
        background-color: ${props => props.theme.purple};

    }
`;

export const ContainerItems = styled.div`
    background: url("${props => props.imageUrl}"), no-repeat;
    background-position: center;
    background-size: cover;
    border: none;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 20px 10px;
    width: 318px;
    height: 232px;
`;

export const CategoryButton = styled(Link)`
    font-family: Poppins, sans-serif;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50px;
    padding: 10px 30px;
    font-size: 22.5;
    font-weight: bold;
    text-decoration: none;
    margin-top: 100px;
    cursor: pointer;
`;