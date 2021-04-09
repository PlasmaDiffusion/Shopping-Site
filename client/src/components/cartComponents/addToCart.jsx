import React, { Component } from "react";
import axios from "axios";
import { getServerUrl, getClientUrl } from "../../services/getUrl.js";
import { withAuth0 } from "@auth0/auth0-react";
import { Button } from "reactstrap";
import {addItemToCart} from "../../services/cartService.js";

//The add to cart button. When pressed it connects to the server to add the item to a user's cart
class AddToCart extends Component {
  constructor(props) {
    super(props);

    this.state = { clicked: false, canClick: false };

    this.addToCartClicked = this.addToCartClicked.bind(this);
    this.findCart = this.findCart.bind(this);
  }

  //After clicking the button, add to cart!
  addToCartClicked() {
    if (this.props.amountInStock <= 0) {
      alert("Not in stock. Check back later!");
      return;
    }

    if (this.state.clicked || this.props.amountToAdd == 0) return;

    this.setState({ clicked: true });

    //Check if logged in, and get the correct cart id
    this.findCart();
  }

  //Get the cart id the user has, if logged in
  findCart() {
    var req = { username: "anonymous" };

    //Check if logged in. If not default to the guest cart.
    if (this.props.auth0.user) req.username = this.props.auth0.user.name;
    else req.username= "Guest";

    //Get/create the cart for the user
    axios.post(getServerUrl() + "/read/cart", req).then((res) => {
      this.setState({ cartId: res.data.id });
      //Create a cart item
      this.createCartItem();
    });
  }

  //Create a cart item and put it in the server (with a reference to the product and cart)
  createCartItem() {
    const newCartItem = {
      cartId: this.state.cartId,
      shopItemId: this.props.productId,
      amountInCart: this.props.amountToAdd,
    };


    addItemToCart(newCartItem, this.props.amountInStock, this.props.amountToAdd);

  }

  //Just render the Add To Cart button
  render() {
    return (
      <button
        onClick={this.addToCartClicked}
        className="btn-orange btn-wide"
      >
        {this.state.clicked ? "Adding..." : "Add To Cart"}
      </button>
    );
  }
}

export default withAuth0(AddToCart);
