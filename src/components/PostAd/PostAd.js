import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleChange } from "./../../Ducks/Reducer";
import axios from "axios";
import Navbar from "./../Navbar/Navbar";
import Dropzone from "react-dropzone";
import request from "superagent";
import "./PostAd.css";

class PostAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      category: "",
      subcategory: "",
      subcategory2: "",
      boards: ["Choose...", "Shortboard", "Longboard", "SUP", "Other"],
      wetsuits: ["Choose...", "Men", "Women", "Kids"],
      gear: [
        "Choose...",
        "Fins",
        "Leashes",
        "Stomp Pads",
        "SUP Paddles",
        "Other"
      ],
      wetsuit_categories: ["Choose...", "Fullsuit", "Springsuit", "Top"],
      title: "",
      description: "",
      photo: "",
      price: "",
      contact: "",
      location: "",
      uploadedFile: "",
      uploadedFileCloudinaryUrl: "",
      show_required: false,
      photo_err_message: ""
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
  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }
  handlePrice(prop, val) {
    let price = Math.round(parseInt(val));
    console.log(price);
    this.setState({ [prop]: price });
  }
  onImageDrop(files) {
    // console.log(files);
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
    let upload = request
      .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", "bsmmtkcp")
      .field("file", file);
    // console.log(upload);

    upload.end((err, response) => {
      console.log(response);
      if (err) {
        console.error(err.message);
        this.setState({ photo_err_message: err.message });
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  postAd() {
    let date = JSON.stringify(new Date()).slice(1, 11);
    let time = JSON.stringify(new Date()).slice(12, 20);
    let {
      category,
      subcategory,
      subcategory2,
      title,
      description,
      uploadedFileCloudinaryUrl,
      price,
      contact, 
      location
    } = this.state;
    let body = {
      category,
      subcategory,
      subcategory2,
      title,
      description,
      uploadedFileCloudinaryUrl,
      price,
      contact,
      date,
      time, 
      location
    };
    if (description === "" || category === "" || subcategory === "") {
      this.setState({
        show_required: true
      });
    } else {
      this.setState({
        show_required: false
      });
      axios.post("/postAd", body).then(response => {
        response.data;
        this.props.history.push("/");
      });
    }
  }
  render() {
    const required_error = (
      <div
        className="open-sans"
        style={{
          color: "red",
          marginTop: "5px",
          marginBottom: "5px",
          fontSize: "20px"
        }}
      >
        Required fields: Category, Subcategory, and Description.
      </div>
    );
    let boards = this.state.boards.map((board, index) => {
      return (
        <option key={`${index}`} value={board}>
          {board}
        </option>
      );
    });
    let wetsuits = this.state.wetsuits.map((wetsuit, index) => {
      return (
        <option key={`${index}`} value={wetsuit}>
          {wetsuit}
        </option>
      );
    });
    let gear = this.state.gear.map((gearItem, index) => {
      return (
        <option key={`${index}`} value={gearItem}>
          {gearItem}
        </option>
      );
    });
    let wetsuit_subcategories = this.state.wetsuit_categories.map(
      (sub, index) => {
        return (
          <option key={`${index}`} value={sub}>
            {sub}
          </option>
        );
      }
    );

    let subcategory =
      this.state.category === "Surfboards"
        ? boards
        : this.state.category === "Wetsuits"
          ? wetsuits
          : this.state.category === "Gear"
            ? gear
            : "Choose...";
    // console.log(this.state.subcategory);
    return this.state.loggedIn === true ? (
      <div className="post_ad_root">
        <h1>Sell Your Stuff</h1>
        <Navbar />
        <br />
        <div />
        <div className="input-group mb-3 post-ad-category">
          <div className="input-group-prepend">
            <label className="input-group-text" for="inputGroupSelect01">
              Category
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            onChange={e => this.handleChange("category", e.target.value)}
            value={this.state.category}
          >
            <option selected>Choose...</option>
            <option value="Surfboards">Surfboards</option>
            <option value="Wetsuits">Wetsuits</option>
            <option value="Gear">Gear</option>
          </select>
        </div>
        <div className="input-group mb-3 post-ad-category">
          <div className="input-group-prepend">
            <label className="input-group-text" for="inputGroupSelect01">
              Subcategory
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            onChange={e => this.handleChange("subcategory", e.target.value)}
            value={this.state.subcategory}
          >
            {subcategory}
          </select>
        </div>
        {this.state.category === "Wetsuits" ? (
          <div className="input-group mb-3 post-ad-category">
            <div className="input-group-prepend">
              <label className="input-group-text" for="inputGroupSelect01">
                Wetsuit Type
              </label>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              onChange={e => this.handleChange("subcategory2", e.target.value)}
              value={this.state.subcategory2}
            >
              {wetsuit_subcategories}
            </select>
          </div>
        ) : null}
        <div className="input-group mb-3 post-ad-category">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Title
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            maxlength="30"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={e => this.handleChange("title", e.target.value)}
            value={this.state.title}
          />
        </div>
        <div className="input-group mb-3 post-ad-category">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Price
            </span>
          </div>
          <input
            type="number"
            className="form-control currency"
            pattern="[0-9]"
            min="0"
            step="1"
            maxlength="5"
            aria-label="Default"
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            aria-describedby="inputGroup-sizing-default"
            onChange={e => this.handlePrice("price", e.target.value)}
            value={this.state.price}
            placeholder="$0.00"
          />
        </div>
        <div className="input-group mb-3 post-ad-category">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Contact
            </span>
          </div>
          <input
            type="text"
            placeholder="how would you like to be contacted?"
            className="form-control contact"
            maxlength="30"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={e => this.handleChange("contact", e.target.value)}
            value={this.state.contact}
          />
        </div>
        <div className="input-group mb-3 post-ad-category">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Location(city, neighborhood, etc)
            </span>
          </div>
          <input
            type="text"
            maxlength="30"
            placeholder="where"
            className="form-control contact"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={e => this.handleChange("location", e.target.value)}
            value={this.state.location}
          />
          {/* <a
            className="link-to-maps"
            target="_blank"
            href={`https://www.google.com/maps/place/${this.state.location}`}
          >
            Find on Maps
          </a> */}
        </div>
        {/* <br /> */}
        <div className="form-group post-ad-category">
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            maxlength="320"
            rows="7"
            onChange={e => this.handleChange("description", e.target.value)}
            value={this.state.description}
          />
        </div>

        {/* <div className="form-group post-ad-category photo-upload">
          <label for="exampleFormControlFile1">Upload a Photo</label>
          <input
            type="file"
            accept="image/jpeg,image/gif,image/bmp,image/png"
            className="form-control-file"
            id="exampleFormControlFile1"
            value={this.state.photo}
          />
        </div> */}
        {this.state.uploadedFileCloudinaryUrl === "" ? (
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={e => this.onImageDrop(e)}
          >
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        ) : null}
        <p
          className="photo-err-message"
          style={{
            color: "red",
            marginTop: "1px",
            marginBottom: "1px",
            fontSize: "20px"
          }}
        >
          {this.state.photo_err_message}
        </p>
        {this.state.uploadedFileCloudinaryUrl === "" ? null : (
          <div>
            <p className="file-name-text">{this.state.uploadedFile.name}</p>
            <img
              className="uploaded-photo"
              src={this.state.uploadedFileCloudinaryUrl}
            />
          </div>
        )}

        <p>{this.state.show_required ? required_error : null}</p>
        <button className="post-ad-btn btn" onClick={_ => this.postAd()}>
          Post Ad
        </button>
      </div>
    ) : (
      <div>
        <Navbar />
        <p className="please-log-in">Please Log In To Post An Ad</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}
export default connect(
  mapStateToProps,
  {}
)(PostAd);
