import React, { Component } from "react";
import { getClientUrl, getServerUrl } from "../../getUrl.js";
import SearchResult from "../searchComponents/searchResult";

import axios from "axios";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { keywords: "", results: [] };

    this.updateSearchBar = this.updateSearchBar.bind(this);
    this.listResults = this.listResults.bind(this);
  }

  //Search for stuff on mount, if there's search keywords in the url that is
  componentDidMount() {
    let url = new URLSearchParams(window.location.search);
    let keywords = url.get("search");

    if (keywords) {
      axios.get(getServerUrl() + "/read/shopItems/" + keywords).then((res) => {
        this.setState({ results: res.data });
      });
    }
  }

  updateSearchBar(e) {
    this.setState({ keywords: e.value });
  }

  //Start searching (Go back to the appropriate route)
  confirmSearch() {
    if (this.props.admin)
      window.location.replace(
        getClientUrl() + "/admin/search/?search=" + this.state.keywords
      );
    else
      window.location.replace(
        getClientUrl() + "/search/?search=" + this.state.keywords
      );
  }

  //List all products found in the search here
  listResults() {
    const listItems = this.state.results.map((product, index) => (
      <div class="col">
        <SearchResult product={product} />
      </div>
    ));

    return (
      <div class="container">
        <div className="row">{listItems}</div>
      </div>
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
              className="searchbar"
            ></input>
          </div>
          <div className="form-group">
            <input
              type="submit"
              id="searchButton"
              value="Search"
              className="btn btn-primary"
            />
          </div>
        </form>
        <div>{this.listResults()}</div>
      </React.Fragment>
    );
  }
}

export default SearchBar;
