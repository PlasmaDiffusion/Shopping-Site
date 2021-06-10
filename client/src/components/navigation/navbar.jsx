import React, {useState} from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavLink, NavItem, NavbarToggler, NavbarBrand,
  Collapse, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../auth/logout-button";
import LoginButton from "../auth/login-button";
import Profile from "../auth/profile";
import SearchBar from "../searchComponents/searchBar";

import "./navbar.scss";

//A navbar that can display links only if logged in.
//The name of the current page you're on can be passed in as a prop to highlight a specific link.
const AuthNav = (props) => {
  const { isAuthenticated } = useAuth0();

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  //Get a css class for either being a current or regular webpage link
  const checkIfInThisNav = (navName) => {
    return (props.title == navName) ? "navItemCurrent" : "navItem";
  }

  return (
    <React.Fragment>
        <div className="mobileNav"> {/* Mobile only toggleable navbar below */}
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">{props.title}</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
            <NavItem >
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="/search/?search=default">Catalogue</NavLink>
            </NavItem>

            <NavItem >
              <NavLink href="/support">Support</NavLink>
            </NavItem>

            <NavItem >
              <NavLink href="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                </svg>
                Cart
                </NavLink>
            </NavItem>

            {/*<NavItem > Cart used to be for login only
              {isAuthenticated ? <NavLink href="/cart">Cart</NavLink> : ""}
            </NavItem>*/}
            </Nav>
          </Collapse>

        </Navbar>
          <Navbar>


            <div className="navBar">{props.noLogin ? "" : <Profile />}</div>
            
            <div className="navBar">
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>

        </Navbar>
      </div>
      <div className="desktopNav"> {/* Desktop only navbar below */}
      <div className="navbar">
        <Nav className="justify-content-start">
          <NavItem className={checkIfInThisNav("Home")}>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem className={checkIfInThisNav("Catalogue")}>
            <NavLink href="/search/?search=default">Catalogue</NavLink>
          </NavItem>

          <NavItem className={checkIfInThisNav("Support")}>
            <NavLink href="/support">Support</NavLink>
          </NavItem>

          <NavItem className={checkIfInThisNav("Cart")}>
              <NavLink href="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                </svg>
                Cart
              </NavLink>
          </NavItem>
        </Nav>
        <Nav className="justify-content-end">
          <NavItem>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </NavItem>

          <NavItem>{props.noLogin ? "" : <Profile />}</NavItem>
        </Nav>
      </div>
      </div>
      <div className="tab"></div>
      <div
        className="justify-content-center searchContainer"
      >
        <SearchBar searchResults={false} />
      </div>


    </React.Fragment>
  );
};

export default AuthNav;
