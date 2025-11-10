import PropTypes from "prop-types";
import { ContainerButton } from "./styles";

export function Button({ children, onClick }) {
    return (
        <ContainerButton onClick={onClick}>
            {children}
        </ContainerButton>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};