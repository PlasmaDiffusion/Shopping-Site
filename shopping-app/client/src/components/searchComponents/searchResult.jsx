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
        <a href={this.props.product.id}>
          <img
            src={this.props.product.imageLink}
            width={256}
            height={256}
            title={this.props.product.name}
            onClick
          />
        </a>

        <div className="searchResult">
          <a href={this.props.product.id}>
            <h2>{this.props.product.name}</h2>
          </a>
          <p>${this.props.product.price}</p>
          <p>{this.props.product.description}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResult;
