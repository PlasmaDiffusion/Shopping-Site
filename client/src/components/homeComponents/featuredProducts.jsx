import React, { Component } from "react";
import ProductCarousel from "./productCarousel";

import { getClientUrl, getServerUrl } from "../../getUrl.js";
import axios from "axios";

//Loads in data for a product carousel
class FeaturedProducts extends Component {
  constructor(props) {
    super(props);

    this.state = { product0: null, product1: null, product2: null };
  }

  componentDidMount() {
    //Read data for each featured product
    axios.get(getServerUrl() + "/read/shopItem/" + 1).then((res) => {
      this.setState({
        product0: res.data,
      });
    });

    axios.get(getServerUrl() + "/read/shopItem/" + 1).then((res) => {
      this.setState({
        product1: res.data,
      });
    });

    axios.get(getServerUrl() + "/read/shopItem/" + 2).then((res) => {
      this.setState({
        product2: res.data,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="center">Featured Products</h1>
        <ProductCarousel
          products={[
            this.state.product0,
            this.state.product1,
            this.state.product2,
          ]}
        />
      </React.Fragment>
    );
  }
}

export default FeaturedProducts;
