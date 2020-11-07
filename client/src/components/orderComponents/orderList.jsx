import React, { Component } from 'react';
import axios from "axios";
import { getServerUrl, getClientUrl } from "../../getUrl.js";
import CartItem from "../cartComponents/cartItem";

//An order displays information, like that of a cart, alongside its progress and if you can cancel it
class OrderList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderState: 0, //0 is not placing, 1 is placing, 2 is successfully placed
            showOrders: false,
            orders: [],
            orderItems: []
        }

        this.getOrders = this.getOrders.bind(this);
        this.listOrders = this.listOrders.bind(this);
    }



    componentDidUpdate() {


        
        //Attempt to place an order if an id was passed in
        var id = this.props.id;
        if (id && this.props.placingOrder && this.state.orderState == 0)
        {
            this.setState({orderState: 1});

            //The cart needs to get its owner name modified. This will keep the cart on the server but let the user have a new one.
            axios.post(getServerUrl() + "/prepareForOrder", {id:id})
            .then((res) => {

                //The order now needs to be created with a reference to the cart
                const newOrderData = {
                    cartId: id,
                    owner: this.props.user,
                    status: "Proccessing",
                }

                axios.post(getServerUrl() + "/create/order", newOrderData)
                .then((res) => {
    
                    this.setState({orderState: 2});
                    alert("The order has been placed!");
                    window.location.reload();
                });
            });
        }


    }

    //Load in all previous orders if the user clicks the button to do so.
    getOrders()
    {
        if (this.state.orders.length == 0)
        {
            axios.post(getServerUrl() + "/read/orders", {username:this.props.user})
            .then((res) => {

                this.setState({orders: res.data});
                console.log("Orders", res.data);

                var orderItems = []


                //Each order has a cart id. We need to basically load in a bunch of carts.
                axios
                .post(getServerUrl() + "/read/cartsWithItems/" , {username:this.props.user})
                .then((cartItemRes) => {
                    
                    console.log("Cart items", cartItemRes.data)
                    this.setState({orderItems: cartItemRes.data});

                    })


                })
                
        }
    }

  

    listOrders() {
      console.log("Order items (state)", this.state.orderItems);
      return(this.state.orderItems.map((cart, index) => (
        
        //Display orders here. (Ignore the user's current cart) TODO: Only display orders in progress, and have an option to display all orders.
        <div key={index} className="container">
            <h1>Order {index+1}</h1>
            <h2>{this.state.orders[index].status}</h2>
            <h3>{this.state.orders[index].createdAt}</h3>
            <h4>${cart.totalPrice} Total</h4>

        

            <div>
              {cart.cartItems.map((product, i) => (
                <div key={i}>
                    <CartItem product={product.shopItem} imageSize={128} cartId={this.state.id} constant={true} />
                </div>
                
              ))}
            </div>

            <br></br><br></br><br></br><br></br><br></br>
        

        </div>
      )))
      }
    
    

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    {(this.state.placingOrder == 1) ? (<h3>Placing Order...</h3>) : ""}
                    {(this.state.placingOrder == 2) ? (<h3>Order Placed!</h3>) : ""}
                </div>
                {this.state.orders.length == 0 ? (                <div className="container">
                    <button className="btn btn-dark" onClick={this.getOrders}>Show Orders</button>
                </div>) : ("")}

            {this.listOrders()}
            </React.Fragment>
        );
    }
}

export default OrderList;