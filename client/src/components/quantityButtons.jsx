import React, { Component } from "react";

class QuantityButtons extends Component {
  constructor(props) {
    super(props);

    this.state = { amount: this.props.amount };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    //Make sure don't go over max
    if (this.state.amount < this.props.max) {
      this.setState({ amount: this.state.amount + 1 });
      this.props.onAmountChanged(this.state.amount);
    }
  }

  onDecrement() {
    //Make sure don't go under 0
    if (this.state.amount > 0) {
      this.setState({ amount: this.state.amount - 1 });
      this.props.onAmountChanged(this.state.amount);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-1">
            <button
              id="decrement"
              className="btn btn-danger"
              onClick={this.onDecrement}
            >
              -
            </button>
          </div>
          <div className="col-sm-1">
            <p>{this.state.amount}</p>
          </div>
          <div className="col-sm-1">
            <button
              id="increment"
              className="btn btn-primary"
              onClick={this.onIncrement}
            >
              +
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1"> </div>
          <div className="col-sm-1">
            <p>
              <i>{this.props.max} in Stock</i>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuantityButtons;
