import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

class Checkout extends Component {
  onToken = (token) => {
    token.card = void 0;
    axios
      .post("/api/payment", { token, amount: this.props.amount })
      .then(respomse => {
        console.log("stripe is working");
      });
  };
  render() {
    return (
      <StripeCheckout
        token = {this.onToken}
        stripeKey = {process.env.REACT_APP_TEST_KEY}
        amount={this.props.amount}
      />
    );
  }
}

export default Checkout;
