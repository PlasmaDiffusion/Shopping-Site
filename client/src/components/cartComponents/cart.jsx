import React, { Component } from "react";
import SearchResult from "../searchComponents/searchResult";
import Profile from "../profile";

import { getClientUrl, getServerUrl } from "../../getUrl.js";

import axios from "axios";
import QuantityButtons from "../quantityButtons";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: -1,
      totalPrice: 0.0,
      cartItems: [],
    };

    //We read this from profile
    this.user = null;

    this.showItemsInCart = this.showItemsInCart.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }

  componentDidMount() {
    //Test out displaying items if the test prop is set
    if (this.props.test) {
      let testCartItems = [
        {
          id: 1,
          shopItemId: 1,
          amountInCart: 1,
          amountInStock: 8,
          name: "Apple",
          imageLink: "https://i.imgur.com/1Gfgzhn.jpg",
          price: 1.99,
        },
        {
          id: 2,
          shopItemId: 2,
          amountInCart: 1,
          amountInStock: 10,
          name: "Paper",
          imageLink: "https://i.imgur.com/NgnLO5G.jpg",
          price: 5.99,
        },
      ];
      this.setState({
        cartItems: testCartItems,
      });
      return;
    }
    //Read in the cart data of a user
    const request = { username: this.user };

    if (!this.user) {
      alert("User not loaded yet. A new cart can't be created");
      return;
    }

    axios.post(getServerUrl() + "/read/cart", request).then((cartRes) => {
      this.setState({
        id: cartRes.data.id,
        totalPrice: cartRes.data.totalPrice,
      });

      //After getting the id it's time to search for items within the cart
      axios
        .get(getServerUrl() + "/read/cartItems/" + this.state.id)
        .then((cartItemRes) => {
          this.setState({
            cartItems: cartItemRes.data,
          });
          console.log(this.state.cartItems);
        });
    });
  }

  showItemsInCart() {
    return (
      <div className="container">
        {this.state.cartItems.map((product, index) => (
          <div className="row" key={index}>
            <SearchResult product={product} imageSize={128} />
            <QuantityButtons
              max={product.amountInStock}
              amount={product.amountInCart}
              onAmountChanged={(newAmount) => {
                //Function that updates item count
                var arr = this.state.cartItems;
                arr[index].amountInCart = newAmount;
                this.setState({ cartItems: [...arr] });
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  getUsername(username) {
    this.user = username;
  }

  render() {
    return (
      <React.Fragment>
        <Profile onAuthenticated={this.getUsername} />
        {this.showItemsInCart()}
      </React.Fragment>
    );
  }
}

export default Cart;
