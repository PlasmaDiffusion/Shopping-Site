import React, { Component } from "react";
import CartItem from "../cartComponents/cartItem";
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
      initialMaxAmounts: [],
      amountToDisplayInStock: [],
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
      //TODO: Make an anonymous cart work
      alert("User not loaded yet. A new cart can't be created");
      return;
    }

    axios.post(getServerUrl() + "/read/cart", request).then((cartRes) => {
      this.setState({
        id: cartRes.data.id,
        totalPrice: cartRes.data.totalPrice,
      });

      console.log(cartRes);

      //After getting the id it's time to search for items within the cart
      axios
        .get(getServerUrl() + "/read/cartItems/" + this.state.id)
        .then((cartItemRes) => {
          this.setState({
            cartItems: cartItemRes.data,
          });

          //Set initial amount array (This is used for recording the original max)
          let initialMax = [];
          let amountToDisplay = [];
          console.log("Cart data", cartItemRes.data);
          for (let i = 0; i < cartItemRes.data.length; i++) {
            let item = cartItemRes.data[i];
            initialMax.push(item.amountInStock + item.amountInCart);
            amountToDisplay.push(item.amountInStock);
          }
          this.setState({
            initialMaxAmounts: [...initialMax],
            amountToDisplayInStock: [...amountToDisplay],
          });
        });
    });
  }

  showItemsInCart() {
    return (
      <div className="container">
        {this.state.cartItems.map((product, index) => (
          <div className="row" key={index}>
            <CartItem product={product} imageSize={128} cartId={this.state.id} />
            <QuantityButtons
              max={this.state.initialMaxAmounts[index]}
              min={1}
              stockAmount={this.state.amountToDisplayInStock[index]}
              amount={product.amountInCart}
              onAmountChanged={(newAmount) => {
                //Function that updates item count
                var arr = this.state.cartItems;
                arr[index].amountInCart = newAmount;
                this.setState({ cartItems: [...arr] });
              }}
            />
            <div style={{ margin: "10px" }}></div>
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
        <Profile onAuthenticated={this.getUsername} invisible={true} />
        {this.showItemsInCart()}
        <h3>
          Total Price: $<i>{this.state.totalPrice}</i>
        </h3>
        <a className="btn btn-primary" >Place Order</a>
      </React.Fragment>
    );
  }
}

export default Cart;
