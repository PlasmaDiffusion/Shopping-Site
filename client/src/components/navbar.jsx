import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavLink, NavItem } from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./auth/logout-button";
import LoginButton from "./auth/login-button";
import Profile from "./profile";

const AuthNav = (props) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="navbar">
      <Nav className="justify-content-left">
        <NavItem className="navItem">
          <NavLink href="/search">Catalogue</NavLink>
        </NavItem>

        <NavItem className="navItem">
          {isAuthenticated ? <NavLink href="/cart">Cart</NavLink> : ""}
        </NavItem>
      </Nav>

      <Nav className="justify-content-end">
        <NavItem>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </NavItem>

        <NavItem>{props.noLogin ? "" : <Profile />}</NavItem>
      </Nav>
    </div>
  );
};

export default AuthNav;
