import React, { Component } from "react";
import { getClientUrl, getServerUrl } from "../../getUrl.js";
import SearchResult from "../searchComponents/searchResult";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

import axios from "axios";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: "",
      category: "All",
      results: [],
      dropdownOpen: false,
      categories: [],
    };

    this.updateSearchBar = this.updateSearchBar.bind(this);
    this.confirmSearch = this.confirmSearch.bind(this);
    this.listResults = this.listResults.bind(this);
    this.toggle = this.toggle.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  //Search for stuff on mount, if there's search keywords in the url that is
  componentDidMount() {
    let url = new URLSearchParams(window.location.search);
    let keywords = url.get("search");

    //TODO: Filter search by categories on backend
    //Check to search for keywords (and filter by category too)
    if (keywords) {
      let categories = url.get("categories");

      axios.get(getServerUrl() + "/read/shopItems/" + keywords).then((res) => {
        this.setState({ results: res.data });
      });
    }

    //Get all categories the user can pick
    axios.get(getServerUrl() + "/read/categories/").then((res) => {
      this.setState({ categories: res.data });
    });
  }

  //Start searching (Manually replace so you can have categories)
  confirmSearch(e) {
    e.preventDefault();

    window.location.replace(
      (this.props.admin ? "/admin/search" : "/search") +
        "/?search=" +
        this.state.keywords +
        "&categories=" +
        this.state.category
    );
  }

  //List all products found in the search here
  listResults() {
    const listItems = this.state.results.map((product, index) => (
      <div className="col">
        <SearchResult product={product} />
      </div>
    ));

    return (
      <div className="container">
        <div className="row">{listItems}</div>
      </div>
    );
  }

  //Enter stuff to search for
  updateSearchBar(e) {
    this.setState({ keywords: e.target.value });
  }

  //Dropdown to select category
  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  getCategories() {
    const categories = this.state.categories.map((category, index) => (
      <div
        className="dropdown-item"
        onClick={() => this.selectCategory(category.name)}
      >
        {category.name}
      </div>
    ));

    return categories;
  }

  selectCategory(e) {
    this.setState({ category: e });
  }

  //Dropdown, followed by search field, followed by search results
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.confirmSearch}>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>{this.state.category}</DropdownToggle>
            <DropdownMenu>{this.getCategories()}</DropdownMenu>
          </Dropdown>

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
