import React, { Component } from "react";
import "./ProductView.css";
import axios from "axios";
import Navbar from "./../Navbar/Navbar";

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: "",
        description: "",
        title: "",
        price: null,
        photo: ""
      }
    };
  }
  componentDidMount() {
    axios.get(`/api/product/${this.props.match.params.id}`).then(res => {
      // console.log( res )
      this.setState({ product: { ...res.data[0] } });
      // console.log('this is the product',res.data[0])
    });
  }

  render() {
    // console.log('the id is', this.state.product.id)
    let {
      description,
      title,
      price,
      photo,
      contact,
      location
    } = this.state.product;
    return (
      <div>
        <Navbar />
        <div className="container-fluid product-view-container ">
          <div className="title-and-img">
            <h2>{title}</h2>
            <img className="product-view-img" src={photo} alt="product image" />
          </div>
          <div className="product-info">
            <h4 className="product-view-price">${price}.00</h4>
            <h4>{description}</h4>
            <br />
            <h4>Contact: {contact}</h4>
          </div>
          {location ? (
            <div className="link-to-maps">
              {" "}
              <a
                className="link-to-maps"
                target="_blank"
                href={`https://www.google.com/maps/place/${location}`}
              >
                Find on Maps
              </a>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ProductView;
