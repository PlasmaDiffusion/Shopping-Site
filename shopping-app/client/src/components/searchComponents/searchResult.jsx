import React, { Component } from "react";
import { getClientUrl, getServerUrl } from "../../getUrl.js";

//The search bar will display many of these search results. Each one is a product to display.
class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h2>{this.props.product.name}</h2>
        <p>{this.props.product.price}</p>
        <p>{this.props.product.description}</p>
      </React.Fragment>
    );
  }
}

export default SearchResult;
