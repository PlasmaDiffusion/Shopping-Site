import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Loading from "../loading";
import Profile from "../profile";
import { submitProduct } from "../adminComponents/formServerFunctions.js";

//If updating, read in product data. Display form, and call a submitter component when finished
class ShopItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "", //Read in but not editable
      name: "",
      description: "",
      imageLink: "",
      price: null,
      amountInStock: null,
    };

    this.user = "";

    //Bind input functions here
    this.onChangeName = this.onChangeName.bind(this);
    this.adminCheck = this.adminCheck.bind(this);
  }

  componentDidMount() {}

  //Submit form data here
  onSubmitShopItem(e) {
    e.preventDefault();

    submitProduct(this.state, this.user);
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  adminCheck(username) {
    //this.setState({ user: username });
    this.user = username;
  }

  render() {
    return (
      <React.Fragment>
        <Profile adminPage={true} onAuthenticated={this.adminCheck}></Profile>
        <form onSubmit={this.onSubmitShopItem}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              required
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              required
            />
          </div>
          <div className="form-group">
            <label>Image Link: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.imageLink}
              onChange={this.onChangeImageLink}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <br></br>
            <input
              type="number"
              className="form-control-sm"
              value={this.state.price}
              onChange={this.onChangePrice}
              step={0.05}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount In Stock:</label>
            <br></br>
            <input
              type="number"
              className="form-control-sm"
              value={this.state.amountInStock}
              onChange={this.onChangePrice}
              step={1}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value={this.props.editing ? "Update Product" : "Add Product"}
              className="btn btn-primary"
            />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ShopItemForm;
