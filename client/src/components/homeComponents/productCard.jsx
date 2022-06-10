import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import { getClientUrl } from "../../services/getUrl.js";

/*
A "card" that shows information on a product, passed in as a prop.
(Needs to check for props, as the featuredProducts component gets them asynchronously)
The top of the card is the image plus a description & buy button when hovered.
The very bottom of the card has the price and name.
*/
const ProductCard = (props) => {


  function getURL(){ return getClientUrl() + "/product/?id=" + props.product.id};

  return (
    <React.Fragment>

        {props.product ? (

          <div className="flex-card">
            <div className={props.className} >

                <div className="card-image">
                    <div className="card-buy">
                      <p className="card-desc">{props.product.description}</p>
                      <a className="btn-round" href={getURL()}>BUY</a>
                    </div>
                    <img src={props.product.imageLink} style={{width:props.imageWidth, height:props.imageHeight}}  className="center"></img>
                </div>
                <div className="card-title">
                  <h3 className="lead" style={{paddingTop:"1rem"}}>{props.product.name}</h3>
                  <p style={{fontSize:"1.5rem"}}>${props.product.price}</p>
                </div>

            </div>
          </div>
               
          //Show nothing if yet to load in product data
        ) : ""}
       
      
    </React.Fragment>
  );
};

export default ProductCard;
