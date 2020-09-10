import React, { Component } from "react";
import axios from "axios";
import { getServerUrl, getClientUrl } from "../../getUrl.js";
import { withAuth0 } from "@auth0/auth0-react";
import { Button } from "reactstrap";

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
    if (this.state.clicked) return;

    this.setState({ clicked: true });

    //Check if logged in, and get the correct cart id
    this.findCart();
  }

  //Get the cart id the user has, if logged in
  findCart() {
    var req = { username: "anonymous" };

    if (!this.props.auth0.isAuthenticated) {
      alert("You need to login to add stuff to the cart.");
      //Or you could ask the user to add it using the name anonymous?
      return;
    }

    if (this.props.auth0.user) req.username = this.props.auth0.user.name;

    console.log(this.props.auth0.user, req.username);

    //Get/create the cart for the user
    axios.post(getServerUrl() + "/read/cart", req).then((res) => {
      this.setState({ cartId: res.data.id });
      alert(res.cartId);
      //Create a cart item
      this.addItemToCart();
    });
  }

  //Create a cart item and put it in the server (with a reference to the product and cart)
  addItemToCart() {
    const newCartItem = {
      cartId: this.state.cartId,
      shopItemId: this.props.productId,
      amountInCart: this.props.amountToAdd,
    };

    axios.post(getServerUrl() + "/create/cartItem", newCartItem).then((res) => {
      //If successful then add to cart
      window.location.replace(getClientUrl() + "/cart");
    });
  }

  //Just render the Add To Cart button
  render() {
    return (
      <button
        onClick={this.addToCartClicked}
        className="btn btn-primary btn-lg active"
      >
        {this.state.clicked ? "Adding..." : "Add to cart"}
      </button>
    );
  }
}

export default withAuth0(AddToCart);
