import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavLink, NavItem } from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./auth/logout-button";
import LoginButton from "./auth/login-button";
import Profile from "./profile";
import SearchBar from "./searchComponents/searchBar";

const AuthNav = (props) => {
  const { isAuthenticated } = useAuth0();

  return (
    <React.Fragment>
      <div className="navbar">
        <Nav className="justify-content-start">
          <NavItem className="navItem">
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink href="/search/?search=default">Catalogue</NavLink>
          </NavItem>

          <NavItem className="navItem">
            <NavLink href="/support">Support</NavLink>
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
      <div className="tab"></div>
      <div
        className="justify-content-center"
        style={{ backgroundColor: "#f3a154" }}
      >
        <SearchBar searchResults={false} />
      </div>
    </React.Fragment>
  );
};

export default AuthNav;
