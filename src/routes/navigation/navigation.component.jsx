// imports from third party libraries
import { Outlet } from "react-router-dom";

// imports from this project
import { ReactComponent as Logo } from "../../assets/logo.svg";
import {
  LogoContainer,
  NavLinks,
  NavigationContainer,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  return (
    <div>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/suppliers">Suppliers</NavLink>
        </NavLinks>
      </NavigationContainer>
      <Outlet />
    </div>
  );
};

export default Navigation;
