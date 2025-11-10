import { Link as ReactLink } from "react-router-dom";
import styled from "styled-components";
import BackgroundLogin from "../../assets/background-login.svg";
import Background from "../../assets/background.svg";

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`;

export const ContainerLeft = styled.div`
    background: url("${BackgroundLogin}");
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 70%;
    }
`;

export const ContainerRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;

    background: url("${Background}");
    background-color: #1e1e1e;

    p {
        color: #fff;
        font-size: 18px;
        font-weight: 800px;
        font-family: "Road Rage", sans-serif;

        a {
            font-family: "Road Rage", sans-serif;
            text-decoration: underline;
            cursor: pointer;
        }
    }
`;

export const Title = styled.h2`
    font-family: "Road Rage", sans-serif;
    color: #fff;
    font-size: 40px;

    span { 
        color: ${props => props.theme.purple};
        font-family: "Road Rage", sans-serif;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 400px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;

    input {
        width: 100%;
        height: 50px;
        border-radius: 5px;
        border: none;
        padding: 0 16px;
    }

    label {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        font-family: "Oswald", sans-serif;
    }

    p {
        color: #ff3636ff;
        height: 10px;
    }
`;

export const Button = styled.button``;

export const Link = styled(ReactLink)`
    text-decoration: none;
    color: #fff;
`;