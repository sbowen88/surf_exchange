import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./Navbar.css";
import {
  select_category,
  select_subcategory,
  select_search_input
} from "./../../Ducks/Reducer";
import profile_icon from "./../../profile-icon-3.png";
import Donate from "./../Donate/Donate";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      type: "",
      category: "",
      subcategory: "",
      search_input: "",
      myFavesOrMyPosts: "",
      donate: false
    };
  }

  componentDidMount() {
    axios
      .get("/checkLoggedIn")
      .then(this.setState({ loggedIn: true }))
      .catch(res => {
        this.setState({ loggedIn: false });
      });
  }

  handleDonate() {
    this.setState({ donate: true });
  }
  // handleChange(prop, val, e) {
  //   this.setState({ [prop]: val });
  //   // console.log("text entered");
  // }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Surfboards
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("Shortboard")}
                  >
                    Shortboards
                  </li>
                </a>
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("Longboard")}
                  >
                    Longboard
                  </li>
                </a>
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("SUP")}
                  >
                    SUP
                  </li>
                </a>
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("Other")}
                  >
                    Other
                  </li>
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Wetsuits
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("Men")}
                  >
                    Men
                  </li>
                </a>
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("Women")}
                  >
                    Women
                  </li>
                </a>
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("Kids")}
                  >
                    Kids
                  </li>
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Gear
              </a>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("Fins")}
                  >
                    Fins
                  </li>
                </a>
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("Leashes")}
                  >
                    Leashes
                  </li>
                </a>
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("Stomp Pads")}
                  >
                    Stomp Pads
                  </li>
                </a>
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("SUP Paddles")}
                  >
                    SUP Paddles
                  </li>
                </a>
                <a className="dropdown-item" href="#">
                  <li
                    value={this.props.subcategory}
                    onClick={e => this.props.select_subcategory("Other")}
                  >
                    Other
                  </li>
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Info
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item"
                  href="http://www.surfline.com/surfline/charts/"
                  target="_blank"
                >
                  Forecasts
                </a>
                <a
                  className="dropdown-item"
                  href="https://www.surfline.com/surf-reports-forecasts-cams"
                  target="_blank"
                >
                  Web Cams
                </a>
              </div>
            </li>
            <li className="nav-item">
              {this.state.loggedIn === true ? (
                <a className="nav-link" href="#">
                  <Link to="/PostAd">Post an ad</Link>
                </a>
              ) : (
                <a className="nav-link" href={process.env.REACT_APP_LOGIN}>
                  Post an ad
                </a>
              )}
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Profile
              </a>
              {this.state.loggedIn === true ? (
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    <Link to="/Profile">View Profile</Link>
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    value={this.props.myPosts}
                    // onClick={e => this.props.myposts(true)}
                  >
                    <Link to="/myPosts"> My Posts</Link>
                  </a>
                  <a className="dropdown-item" href="#">
                    <Link to="/MyFavorites">My Favorites</Link>
                  </a>
                  <a
                    className="dropdown-item"
                    href={process.env.REACT_APP_LOGOUT}
                  >
                    Logout
                  </a>
                </div>
              ) : (
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {" "}
                  <a
                    className="dropdown-item"
                    href={process.env.REACT_APP_LOGIN}
                  >
                    Login
                  </a>
                </div>
              )}
            </li>
          </ul>
          {this.state.donate === true ? (
            <Donate />
          ) : (
            <button
              className="btn btn-warning donate-btn"
              onClick={_ => this.handleDonate()}
            >
              DONATE
            </button>
          )}
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              maxlength="25"
              value={this.props.search_input}
              onChange={e => this.props.select_search_input(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { category, subcategory, search_input, myPosts } = state;
  return { category, subcategory, search_input, myPosts };
}

export default connect(
  mapStateToProps,
  {
    select_category,
    select_subcategory,
    select_search_input
    // select_myPosts
  }
)(Navbar);
