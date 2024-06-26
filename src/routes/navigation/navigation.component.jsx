// imports from third party libraries
import { Outlet } from "react-router-dom";

// imports from this project
import logo from "../../assets/logo.png";
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
          <img src={logo} alt="logo" />
        </LogoContainer>

        <NavLinks>
          {/* <NavLink to="/">Home</NavLink> */}
          <NavLink to="/order">Order</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/suppliers">Suppliers</NavLink>
        </NavLinks>
      </NavigationContainer>
      <Outlet />
    </div>
  );
};

export default Navigation;
