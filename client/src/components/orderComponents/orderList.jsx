import React, { Component } from 'react';
import axios from "axios";
import { getServerUrl, getClientUrl } from "../../getUrl.js";

//An order displays information, like that of a cart, alongside its progress and if you can cancel it
class OrderList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderState: 0 //0 is not placing, 1 is placing, 2 is successfully placed
        }

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


        //Load in all previous orders if the user clicks the button to do so.
        if (this.props.showOrders)
        {

        }

    }
    

    render() {
        return (
            <div className="container">
                {(this.state.placingOrder == 1) ? (<h3>Placing Order...</h3>) : ""}
                {(this.state.placingOrder == 2) ? (<h3>Order Placed!</h3>) : ""}
            </div>
        );
    }
}

export default OrderList;