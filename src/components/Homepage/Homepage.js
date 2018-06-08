import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Homepage.css";
import Navbar from "./../Navbar/Navbar";
import gallery from "./../../Images/gallery-icon-last.png";
import list from "./../../Images/hamburger-icon.png";
import { getUserInfo } from "./../../Ducks/Reducer";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      products: [],
      sort_parameter: "",
      selected_clicked: false,
      list_menu_clicked:false,
      gallery_menu_clicked:true
    };
  }
  componentDidMount() {
    axios.get("/api/getProducts").then(products => {
      this.setState({ products: products.data });
    });
    if (this.props.loggedIn === true) {
      this.props.getUserInfo();
    }
  }

  addToFavorites(product_id) {
    axios.post("/addToFavorites", { product_id }).then(response => {
      response.data;
      axios.get("/api/getProducts").then(products => {
        this.setState({ products: products.data });
      });
    });
    // alert('Added To Favorites')
  }
  removeFromFavorites(product_id) {
    axios.delete(`/removeFromFavorites/${product_id}`).then(response => {
      response.data;
      axios.get("/api/getProducts").then(products => {
        this.setState({ products: products.data });
      });
    });
  }

  render() {
    // console.log(this.state.products);
    let currentProducts =
      this.props.subcategory !== ""
        ? this.state.products.filter(product => {
            return product.subcategory === this.props.subcategory
              ? true
              : false;
          })
        : this.props.search_input !== ""
          ? this.state.products.filter(product => {
              return product.description
                .toLowerCase()
                .includes(this.props.search_input.toLowerCase())
                ? true
                : false;
            })
          : this.state.products;

    const info = this.state.gallery_menu_clicked===true?currentProducts.map((product, i) => {
      return (
        <div className="card">
          <Link className="image-link" to={`/product/${product.id}`}>
            <img
              className="card-img-top"
              src={product.photo}
              alt="Product Image"
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            {/* <p className="card-text">{product.description}</p> */}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">${product.price}.00</li>
          </ul>
          <div className="card-body">
            {/* <a href="#" className="card-link">
              <Link className="card-link" to={`/product/${product.id}`} key={i}>
                View Post
              </Link>
            </a> */}
            <label for="id-of-input" className="custom-checkbox">
              <input type="checkbox" id="id-of-input" />

              {product.is_favorite === true ? (
                <span
                  className="un-favorite-text"
                  onClick={_ => this.removeFromFavorites(product.id)}
                >
                  Un-Favorite
                </span>
              ) : (
                <span
                  className="favorite-text"
                  onClick={_ => this.addToFavorites(product.id)}
                >
                  Add To Favorites
                </span>
              )}
            </label>
            <p className="post-date">posted on {product.date}</p>
          </div>
        </div>
      );
    }):currentProducts.map((product, i) => {
      return (
        <div>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </div>
      )});
    return (
      <div className="container-fluid">
        <h1>CA Surf Exchange</h1>
        <Navbar />
        <section id="main_content">
          <p className="welcome-text">
            Welcome to casurfexchange.com, an online classifieds site where you
            can buy and sell personal surfing items for free!
          </p>
          <div className="view-icon-container">
            <img
              src={gallery}
              alt="gallery view"
              title="gallery view"
              className="view-icon-btn"
            />
            <img
              src={list}
              alt="list view"
              title="list view"
              className="view-icon-btn"
            />
          </div>
          <div className="container-fluid" id="card-container">
            {info}
          </div>
        </section>
        <footer>
          <p> @CASURFEXCHANGE</p>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { category, subcategory, search_input, loggedIn } = state;
  return { category, subcategory, search_input, loggedIn };
}

export default connect(
  mapStateToProps,
  { getUserInfo }
)(Homepage);
