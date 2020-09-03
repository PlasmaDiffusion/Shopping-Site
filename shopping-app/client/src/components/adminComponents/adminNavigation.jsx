import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

class AdminNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/admin/">Admin</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/admin/">Add Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/search">Find Products to Edit</NavLink>
              </NavItem>
            </Nav>
            <NavbarText></NavbarText>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}
export default AdminNavigation;
