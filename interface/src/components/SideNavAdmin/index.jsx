import Logo from "../../assets/logo.svg";
import { useUser } from "../../hooks/UserContext.jsx";
import { navLinks } from "./navLinks";
import { SignOut } from "phosphor-react";
import { Container, Footer, NavLinkContainer, NavLink } from "./styles";
import { useResolvedPath } from "react-router-dom";

export function SideNavAdmin() {
    const { logout } = useUser();
    const { pathname } = useResolvedPath();

    return(
        <Container>
            <img src={Logo} />
            <NavLinkContainer>
                {navLinks.map( link => (
                    <NavLink key={link.id} to={link.path} $isActive={pathname === link.path}>
                        {link.icon}
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </NavLinkContainer>
            <Footer>
                <NavLink to="/login" onClick={logout}>
                    <SignOut />
                    <span>Sair</span>
                </NavLink>
            </Footer>
        </Container>
    );
}