import React, { Component } from "react";

import SearchBar from "../searchComponents/searchBar";

class AdminSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true };
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar></SearchBar>
      </React.Fragment>
    );
  }
}

export default AdminSearch;
