import styled from "styled-components";
import background from "../../assets/background.svg";
import cartbackground from "../../assets/cartbackground.svg";

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: url("${background}");
`;

export const Banner = styled.div`
    display: flex;
    justify-content: center;
    height: 150px;
    position: relative;

    background: url("${cartbackground}");
    background-position: center;
    background-size: cover;
    background-color: #1f1f1f;

    img {
        height: 140px;
        margin: auto;
    }
`;

export const Title = styled.h1`
    color: #61A120;
    font-size: 32px;
    font-weight: 800;
    padding-bottom: 12px;
    text-align: center;
    margin: 50px;
    position: relative;

    &::after {
        background-color: #61A120;
        height: 4px;
        width: 56px;
        position: absolute;
        left: calc(50% - 20px);
        bottom: 0;
        content: "";
    }
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 30%;
    width: 100%;
    max-width: 1280px;
    padding: 40px;
    margin: 0 auto;
    gap: 40px;
`;