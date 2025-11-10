import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    *{
        color: #484848;
        font-weight: 500;
    }

    .container-top {
        display: grid;
        grid-gap: 10px 30%;
        grid-template-areas: 
            "title title"
            "itens itensPrice"
            "taxa taxaPrice";
    }

    .title {
        grid-area: title;
        background-color: #484848;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 20px;
        padding: 15px;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    }

    .itens {
        grid-area: itens;
        margin-left: 20px;
    }

    .itensPrice {
        grid-area: itensPrice;
        margin-right: 20px;
    }

    .taxa {
        grid-area: taxa;
        margin-left: 20px;
    }

    .taxaPrice {
        grid-area: taxaPrice;
        margin-right: 20px;
    }

    .container-bottom {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        font-weight: 700;
        margin-top: 24px;
        padding: 30px;
    }

    * {
        font-weight: 700;
    }
`;
