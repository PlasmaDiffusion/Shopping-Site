import React, { Component } from 'react';
import Order from "./order";
import { placeOrder, readOrders, readOrderItems } from '../../services/orderService.js';


//An order displays information, like that of a cart, alongside its progress and if you can cancel it
class OrderList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderState: 0, //0 is not placing, 1 is placing, 2 is successfully placed
            loadOrders: false,
            orders: [],
            orderItems: []
        }

        this.getOrders = this.getOrders.bind(this);
        this.listOrders = this.listOrders.bind(this);
        this.getUsername = this.getUsername.bind(this);
    }

    //Get the username prop or return Guest if nothing was sent
    getUsername(){return this.props.user ? this.props.user : "Guest";}

    componentDidUpdate() {


        
        //Attempt to place an order if an id was passed in
        var id = this.props.id;
        if (id && this.props.placingOrder && this.state.orderState == 0)
        {
            this.setState({orderState: 1});
            placeOrder(this.getUsername(), id).then((res) => {
                this.setState({ orderState: 2 });
                alert("The order has been placed!");

                //Reload to get a new, empty cart ready
                window.location.reload();
            });

     
        }
        
    }

    //Load in all previous orders if the user clicks the button to do so.
    async getOrders()
    {
        if (this.state.orders.length == 0)
        {

            await readOrders(this.getUsername()).then((res) => {                
                if (!res) alert("No orders found.")
                else this.setState({ orders: res});
              });

            await readOrderItems(this.getUsername()).then((res) => {
                if (res) this.setState({orderItems: res});
                
            });
        }
    }

    //The date and time string seqeulize provides is ugly. Let's reformat it.
    formatDate(dateAndTime)
    {
        if (dateAndTime)
        {
            //Get rid of the T
            let date = dateAndTime.split("T");

            //Format time (hours and minutes, minus seconds)
            let time = date[1].split(".");
            time = (time[0]+time[1]+time[2]).split(":");


            return date[0] + ",  " + time[0] + ":" + time[1];
        }

        return "";
    }


    listOrders()
    {
        //console.log("Order items (state)", this.state.orderItems);
        return this.state.orderItems.map((cart, index) => (
            <Order
            status={this.state.orders[index].status}
            createdAt={this.state.orders[index].createdAt}
            cart={cart}
            id = {this.state.orders[index].id}
            index={index}
            />
        ))
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
                    <div style={{margin:50}}></div>
                </div>) : ("")}

            {this.listOrders()}
            </React.Fragment>
        );
    }
}

export default OrderList;

