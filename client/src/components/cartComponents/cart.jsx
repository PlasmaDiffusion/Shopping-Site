import React, { Component } from "react";
import SearchResult from "../searchComponents/searchResult";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Read in the cart data of a user
    axios.get(getServerUrl() + "/read/shopItem/" + id).then((res) => {
      this.setState({
        name: res.data.name,
        description: res.data.description,
        price: res.data.price,
        id: res.data.id,
        imageLink: res.data.imageLink,
        amountInStock: res.data.amountInStock,
        loaded: true,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <SearchResult />
      </React.Fragment>
    );
  }
}
