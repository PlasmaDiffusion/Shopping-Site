import React, { Component } from "react";
import { getClientUrl, getServerUrl } from "../../services/getUrl.js";

import "./search.scss";

//The search bar will display many of these search results. Each one is a product to display.
class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="searchResult">
        <a
          href={
            (this.props.admin ? "/admin/update/?id=" : "/product/?id=") +
            this.props.product.id
          }
        >
          <img
            src={this.props.product.imageLink}
            width={this.props.imageSize}
            height={this.props.imageSize}
            title={this.props.product.name}
            onClick
          />
        </a>

        <div className="searchResult-bottom">
          <a
            href={
              (this.props.admin ? "/admin/update/?id=" : "/product/?id=") +
              this.props.product.id
            }
          >
            <h2>{this.props.product.name}</h2>
          </a>
          <p>${this.props.product.price}</p>

        </div>
        </div>
    );
  }
}

SearchResult.defaultProps = {
  imageSize: 256,
};

export default SearchResult;
