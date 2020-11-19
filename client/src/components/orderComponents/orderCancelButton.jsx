import React, { Component } from 'react';

//Handles all code needed to send order to the server to be cancelled.
class OrderCancelButton extends Component {
    constructor(props) {
        super(props);

        this.cancelOrder = this.cancelOrder.bind(this);
        this.setupCancelData = this.setupCancelData.bind(this);
    }


    componentDidMount() {

        console.log("Order cancel data: ", this.props);
    }

    cancelOrder()
    {
        //Have to have an order id prepared.
        if (this.props.orderId)
        {
            this.setupCancelData();
        }
    }

    setupCancelData()
    {
        //Go through all items in the cart, get their ids into an array and quantities into an array.
        if (this.props.cart)
        {
            let shopItemIds = [];
            let itemQuantities = [];

            console.log(this.props.cart.cartItems);

            this.props.cart.cartItems.forEach(item => {
                
                shopItemIds.push(item.shopItemId);
                itemQuantities.push(item.amountInCart);
            });

            console.log("Order cancel Arrays: ", shopItemIds, itemQuantities);
        }
        else
        {
            alert("No cart in props.");
        }
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-danger" onClick={this.cancelOrder}><i class="fa fa-stop" ></i> Cancel Order</button>
            </React.Fragment>
        );
    }
}

export default OrderCancelButton;