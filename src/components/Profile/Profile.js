import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserInfo } from "./../../Ducks/Reducer";
import { Link } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import axios from "axios";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      photo: ""
    };
  }

  componentDidMount() {
    //   this.props.getUserInfo()
    axios
      .get("/checkLoggedIn")
      .then(this.setState({ loggedIn: true }))
      .catch(res => {
        this.setState({ loggedIn: false });
      });
    this.getUserInfo();
  }
  getUserInfo() {
    axios.get("/getUserInfo").then(res =>
      this.setState({
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        username: res.data.username,
        email: res.data.email,
        photo: res.data.photo
      })
    );
  }

  handleChange(prop, val) {
    console.log("changing");
    this.setState({ [prop]: val });
  }
  patchUser() {
    let { first_name, last_name, username, email } = this.state;
    let body = {
      first_name,
      last_name,
      username,
      email
    };

    axios.patch("/userPatch", body).then(res => {
      this.props.history.push("/");
    });
  }

  render() {
    console.log(this.state.first_name);
    return this.state.loggedIn === true ? (
      <div>
        <h1>Edit Profile</h1>
        <Navbar />
        <div className="container-fluid" id="card-container">
          {/* <div className="container-fluid"><Link to ='/' className='home-link'>Home</Link></div> */}
          <hr />
          {/* <!-- left column --> */}
          {/* <div className="col-md-3">
            <div className="text-center">
              <img
                src="//placehold.it/100"
                className="avatar img-circle profile-picture"
                alt="avatar"
              />
              <h6 className='profile-photo-upload'>Upload a different photo...</h6>
              <input type="file" className="form-control no-file-chosen" />
            </div>
          </div> */}

          {/* <!-- edit form column --> */}
          <div className="col-md-9 personal-info">
            <div className="alert alert-info alert-dismissable">
              <a className="panel-close close" data-dismiss="alert">
                ×
              </a>
              <i className="fa fa-coffee" />
              Be sure to click the save button to save any changes.
            </div>
            <h3>Personal info</h3>

            <form className="form-horizontal profile-form" role="form">
              <div className="form-group profile-input">
                <label className="col-lg-3 control-label">First name:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.first_name}
                    onChange={e =>
                      this.handleChange("first_name", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="form-group profile-input">
                <label className="col-lg-3 control-label">Last name:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.last_name}
                    onChange={e =>
                      this.handleChange("last_name", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-group profile-input">
                <label className="col-lg-3 control-label">Email:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.email}
                    onChange={e => this.handleChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group profile-input">
                <label className="col-lg-3 control-label">Username:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.username}
                    onChange={e =>
                      this.handleChange("username", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-group profile-input">
                <label className="col-md-3 control-label" />
                <div className="col-md-8">
                  <input
                    type="button"
                    className="btn btn-primary"
                    value="Save Changes"
                    onClick={_ => this.patchUser()}
                  />
                  <span />
                  <input
                    type="reset"
                    className="btn btn-default cancel-btn"
                    value="Cancel"
                    onClick={e => this.getUserInfo()}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <Navbar />
        <p className="welcome-text">Please Log In To See Profile</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}
export default connect(
  mapStateToProps,
  { getUserInfo }
)(Profile);
