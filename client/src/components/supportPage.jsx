import React, { Component } from "react";

class SupportPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Support</h1>
        <br></br>
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">How do I see my past orders?</h5>
              {/*<small>3 days ago</small>*/}
            </div>
            <p class="mb-1">
              Click Cart, and at the top of the page click View Orders. You
              don't have any orders if this doesn't show up.
            </p>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Can I cancel an order?</h5>
            </div>
            <p class="mb-1">
              Not at this time can you manually cancel an order. You'll have to
              contact us for now. A manual order cancelling feature will be
              added soon.
            </p>
          </a>
          <a
            href="#link"
            id="link"
            class="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Customer Service</h5>
            </div>
            <p class="mb-1">A live chat service will be made later.</p>
            <small class="text-muted">Click to go to a live chat.</small>
          </a>
        </div>
      </div>
    );
  }
}

export default SupportPage;
