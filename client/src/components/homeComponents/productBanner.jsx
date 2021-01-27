import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import { getClientUrl } from "../../getUrl";

//A "banner" that shows information on a product, passed in as a prop.
//(Needs to check for props, as the featuredProducts component gets them asynchrously)
const ProductBanner = (props) => {


  return (
    <React.Fragment>

        {props.product ? (
           <div class="jumbotron">
           <a href={getClientUrl() + "/product/?id=" + props.product.id}>
                 <img src={props.product.imageLink} className="center"></img>
               </a>
               <div className="featuredDescription">
                 <h3>{props.product.name}</h3>
                 <p>{props.product.description}</p>
               </div>
           </div>
        ) : ""}
       
      
    </React.Fragment>
  );
};

export default ProductBanner;
