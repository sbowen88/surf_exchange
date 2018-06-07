import React, { Component } from "react";
import Navbar from "./../Navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

class MyFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }
  componentDidMount() {
    axios.get("/getUserInfo").then(resp => {
      this.setState({ user: resp.data });
      console.log("this is the users id", resp.data.id);
    });
    axios.get("/api/getFavorites").then(products => {
      this.setState({ favorites: products.data });
    });
  }
  getFavorites() {
    axios.get("/api/getFavorites").then(products => {
      this.setState({ favorites: products.data });
    });
  }
  removeFromFavorites(product_id) {
    axios.delete(`/removeFromFavorites/${product_id}`).then(response => {
      response.data;
      this.getFavorites();
    });
  }
  render() {
    console.log(this.state.favorites);

    let renderFavorites = this.state.favorites.map((product, i) => {
      return (
        <div className="card">
          <img className="card-img-top" src={product.photo} alt="Product Image" />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Price:${product.price}.00</li>
          </ul>
          <div className="card-body">
            <Link
              className="card-link"
              to={`/product/${product.product_id}`}
              key={i}
            >
              View Post
            </Link>
            <label for="id-of-input" className="custom-checkbox">
              <input type="checkbox" id="id-of-input" />
              <span
                className="favorite-text"
                onClick={_ => this.removeFromFavorites(product.product_id)}
              >
                Remove
              </span>
            </label>
            <p className="post-date">posted on {product.date}</p>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h1>My Favorites</h1>
        <Navbar />
        <br />
        <div className="container-fluid" id="card-container">
          {renderFavorites}
        </div>
      </div>
    );
  }
}

export default MyFavorites;
