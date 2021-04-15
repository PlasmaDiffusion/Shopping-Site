import React, { Component } from "react";
import ProductCarousel from "./productCarousel";
import ProductCard from "./productCard";
import { getClientUrl, getServerUrl } from "../../services/getUrl.js";
import "./featuredProducts.scss"
import axios from "axios";

//Loads in data for a product carousel
class FeaturedProducts extends Component {
  constructor(props) {
    super(props);

    this.state = { product0: null, product1: null, product2: null };
  }

  componentDidMount() {
    
    //Read data for each featured product
    axios.get(getServerUrl() + "/read/shopItem/" + 5).then((res) => {
      this.setState({
        product0: res.data,
      });
    });

    axios.get(getServerUrl() + "/read/shopItem/" + 2).then((res) => {
      this.setState({
        product1: res.data,
      });
    });

    axios.get(getServerUrl() + "/read/shopItem/" + 6).then((res) => {
      this.setState({
        product2: res.data,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div style={{padding:"2rem"}}></div>
        <h1 className="center display-4">Featured Products</h1>
        <div style={{padding:"20px"}}></div>
        <div className="flex-container">
          <ProductCard product={this.state.product0} imageWidth="256px" imageHeight="256px" className="row productCard" />
          <ProductCard product={this.state.product1} imageWidth="256px" imageHeight="256px" className="row productCard" />
          <ProductCard product={this.state.product2} imageWidth="256px" imageHeight="256px" className="row productCard" />
        </div>

        {/*<ProductCarousel
          products={[
            this.state.product0,
            this.state.product1,
            this.state.product2,
          ]}
        />*/}
      </React.Fragment>
    );
  }
}

export default FeaturedProducts;
