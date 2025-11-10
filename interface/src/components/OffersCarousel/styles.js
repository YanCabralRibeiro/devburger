import styled from "styled-components";

export const Container = styled.div`
    .carousel-item {
        padding-right: 40px;
    }

    .react-multi-carousel-list {
        overflow: visible;
    }

    .react-multiple-carousel__arrow--right {
        top: 10px;
    }

    .react-multiple-carousel__arrow--left {
        top: 10px;
        left: 12px;
    }

    overflow-x: hidden;
    padding-left: 40px;
    padding-bottom: 40px;
`;

export const Title = styled.h2`
    font-size: 38px;
    font-weight: 800;
    color: #61A120;
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin-top:40px;
    margin-bottom: 90px;

    &::after {
        content: "";
        position: absolute;
        left: calc(50% - 28px);
        bottom: 0;
        width: 56px;
        height: 4px;
        background-color: #61A120;

    }
`;