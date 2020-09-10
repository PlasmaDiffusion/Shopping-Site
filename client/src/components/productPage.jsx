import React, { Component } from "react";
import { getClientUrl, getServerUrl } from "../getUrl.js";
import axios from "axios";
import QuantityButtons from "./quantityButtons";
import AddToCart from "./cartComponents/addToCart";

//A component that shows information of the product and the ability to add one or more of it to your cart.
class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      name: "",
      description: "",
      price: "",
      id: -1,
      imageLink: "",
      amountInStock: 0,
      amountToAdd: 0,
    };

    this.updateAmountToAdd = this.updateAmountToAdd.bind(this);
  }

  //Load in data of this specific product from the database
  componentDidMount() {
    var url = new URLSearchParams(window.location.search);
    var id = url.get("id");

    //Id defaults to 1
    if (!id) id = 1;

    //Read in the data for this product from the server database
    axios.get(getServerUrl() + "/read/shopItem/" + id).then((res) => {
      this.setState({
        name: res.data.name,
        description: res.data.description,
        price: res.data.price,
        id: res.data.id,
        imageLink: res.data.imageLink,
        amountInStock: res.data.amountInStock,
        loaded: true,
      });
    });
  }

  updateAmountToAdd(amount) {
    this.setState({ amountToAdd: amount });
  }

  render() {
    if (this.state.loaded)
      return (
        <React.Fragment>
          <img
            src={this.state.imageLink}
            width={256}
            height={256}
            title={this.state.name}
            onClick
          />

          <div className="searchResult">
            <a href={this.state.id}>
              <h2>{this.state.name}</h2>
            </a>
            <p>${this.state.price}</p>
            <p>{this.state.description}</p>
          </div>

          <QuantityButtons
            max={this.state.amountInStock}
            amount={0}
            onAmountChanged={this.updateAmountToAdd}
          />

          <AddToCart
            productId={this.state.id}
            amountInStock={this.state.amountInStock}
            amountToAdd={this.state.amountToAdd}
          />
        </React.Fragment>
      );
    else return "Loading...";
  }
}

export default ProductPage;
