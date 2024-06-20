import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 7rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 7rem;
  margin: auto 0;
  /* margin-left: 20rem; */
`;

export const NavLinks = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* margin-right: 20rem; */
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  margin: 2rem;
  cursor: pointer;
  font-size: 2rem;
  letter-spacing: 0.5px;
  text-decoration: none;
  color: black;
  font-weight: bold;
`;
