import React, { useState, useEffect } from 'react';
import OrderCancelButton from "./orderCancelButton";
import CartItem from "../cartComponents/cartItem";

//Refactored part of OrderList function (Still need to replace)
function Order(props){

    function formatDate(dateAndTime)
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



    return(
    <div key={props.index} className="container">
    {props.status ? <div>
    <div className="border">
        <h2>Order {props.index+1} - {props.status}</h2>
        <i>Placed on {formatDate(props.createdAt)}</i>
        <div style={{padding: 5}}/>
        <h4>${props.cart.totalPrice} Total</h4>
        <div style={{padding: 5}}/>
        {/* Option to cancel the order, if it's only proccessing and not delivered */}
        {props.status == "Proccessing" ?
        <OrderCancelButton cart={props.cart} orderId={props.id} />
        : ""}
        <div style={{padding: 5}}/>

    </div>



    <div className="border">
      {props.cart.cartItems.map((product, i) => (
        <div key={i}>
            <CartItem product={product.shopItem} amountInCart={product.amountInCart} id={product.shopItemId} imageSize={128} cartId={props.id} constant={true} />
            <div  style={{paddingLeft: 128}}>{product.amountInCart}</div>
            <br></br><br></br>
        </div>
        
      ))}
    </div>

    <br></br><br></br><br></br><br></br><br></br>

    </div>: ""}
    </div>);
}

export default Order;