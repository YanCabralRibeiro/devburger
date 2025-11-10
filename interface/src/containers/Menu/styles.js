import styled from "styled-components";
import { Link } from "react-router-dom";
import hamburguerBanner from "../../assets/banner-menu.svg";
import Background from "../../assets/background.svg";

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(255,255,255, 0)),
        url("${Background}");
    background-color: #f0f0f0;
`;

export const Banner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 480px;
    width: 100%;
    background: url("${hamburguerBanner}") no-repeat;
    background-color: #1f1f1f;
    background-size: cover;
    background-position: center;

    h1 {
        color: #fff;
        font-family: "Road Rage", sans-serif;
        font-size: 80px;
        line-height: 65px;
        position: absolute;
        right: 20%;
        top: 20%;

        span {
            display: block;
            color: #fff;
            font-size: 20px;
            font-weight: 400;
        }
    }
`;

export const CategoryMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 30px;
`;

export const CategoryButton = styled(Link)`
    cursor: pointer;
    color: ${(props) => props.$isActiveCategory ? "#9e2dbbff" : "#9758a6"};
    text-decoration: none;
    font-weight: 500;
    font-size: 24px;
    line-height: 20px;
    padding-bottom: 5px;
    border-bottom: ${(props) => props.$isActiveCategory && "4px solid #9e2dbbff"};
`;

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
    gap: 60px;
    justify-content: center;
    max-width: 1280px;
    margin: 50px auto;
`;