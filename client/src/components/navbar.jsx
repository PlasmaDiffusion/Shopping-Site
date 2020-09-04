import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./auth/logout-button";
import LoginButton from "./auth/login-button";

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Nav className="justify-content-end">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Nav>
  );
};

export default AuthNav;
