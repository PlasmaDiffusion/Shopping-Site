import React, { Component } from "react";
import { getClientUrl, getServerUrl } from "../../getUrl.js";

import axios from "axios";

//The search bar will display many of these search results. Each one is a product to display.
class CartItem extends Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
  }

  deleteItem() {
    axios
      .post(getServerUrl() + "/delete/cartItem", {
        id: this.props.product.id,
        amountInCart: this.props.product.amountInCart,
        shopItemId: this.props.product.shopItemId,
      })
      .then((res) => {
        window.location.reload();
      });
  }

  updateAmount() {}

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row searchResult">
            <div className="col-sm-">
              <a href={"/product/?id=" + this.props.product.id}>
                <img
                  src={this.props.product.imageLink}
                  width={this.props.imageSize}
                  height={this.props.imageSize}
                  title={this.props.product.name}
                  onClick
                />
              </a>
            </div>
            <div className="col-sm-4">
              <a href={"/product/?id=" + this.props.product.id}>
                <h2>{this.props.product.name}</h2>
              </a>
              <p>${this.props.product.price}</p>
            </div>
            <div className="col-sm-">
              <button className="btn btn-danger" onClick={this.deleteItem}>
                Delete
              </button>
              <br></br>
              <button className="btn btn-secondary" onClick={this.updateAmount}>
                Change Amount
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CartItem.defaultProps = {
  imageSize: 256,
};

export default CartItem;
