import React, { Component } from "react";
import Checkout from "./../Checkout/Checkout";
import axios from "axios";
import "./Donate.css"

class Donate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }
  handleDonation(e) {
    this.setState({ amount: e });
  }

  render() {
      console.log(this.state.amount)
    return (
      <div className="donate-container">
        <input
          className="form-control mr-sm-2 donation-input"
          type="number"
          onChange={e => this.handleDonation(e.target.value)}
        />
        <Checkout amount={this.state.amount * 100} />
      </div>
    );
  }
}

export default Donate;
