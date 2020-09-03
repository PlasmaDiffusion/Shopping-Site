import React, { Component } from "react";
import { getClientUrl } from "../getUrl.js";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { keywords: "" };

    this.updateSearchBar = this.updateSearchBar.bind(this);
  }

  updateSearchBar(e) {
    this.setState({ keywords: e.value });
  }

  //Start searching (Go back to the appropriate route)
  confirmSearch() {
    if (this.props.admin)
      window.location.replace(
        getClientUrl() + "/admin/search/?keywords=" + this.state.keywords
      );
    else
      window.location.replace(
        getClientUrl() + "/search/?keywords=" + this.state.keywords
      );
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.confirmSearch}>
          <div className="form-group">
            <input
              type="text"
              name="search"
              placeholder="Enter products to search for here..."
              onChange={this.updateSearchBar}
            ></input>
          </div>
          <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
          </div>
          {/*<div className="container">
            <div className="row">
              <div className="col-lg-10">
                <div className="form-group">
                  <input
                    type="text"
                    name="search"
                    placeholder="Enter products to search for here..."
                    onChange={this.updateSearchBar}
                  ></input>
                </div>
              </div>
              <div className="col-sm">
                <div className="form-group">
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </div>
    </div>*/}
        </form>
      </React.Fragment>
    );
  }
}

export default SearchBar;
