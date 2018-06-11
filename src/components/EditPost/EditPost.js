import React, { Component } from "react";
import axios from "axios";
import Navbar from "./../Navbar/Navbar";
import Dropzone from "react-dropzone";
import request from "superagent";
import "./EditPost.css";

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      photo: "",
      price: "",
      description: "",
      title: "",
      uploadedFile: "",
      uploadedFileCloudinaryUrl: "",
      photo_err_message: ""
    };
  }
  componentDidMount() {
    axios.get(`/api/product/${this.props.match.params.id}`).then(res => {
      this.setState({
        product: res.data[0],
        price: res.data[0].price,
        photo: res.data[0].photo,
        description: res.data[0].description,
        title: res.data[0].title
      });
      console.log("this is the product", res.data[0]);
    });
  }
  getProduct() {
    axios.get(`/api/product/${this.props.match.params.id}`).then(res => {
      this.setState({
        product: res.data[0],
        price: res.data[0].price,
        photo: res.data[0].photo,
        description: res.data[0].description,
        title: res.data[0].title
      });
    });
  }
  handleChange(prop, val) {
    console.log("changing");
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
  patchPost() {
    let {
      title,
      description,
      price,
      uploadedFileCloudinaryUrl,
      photo
    } = this.state;
    let { id } = this.props.match.params;

    let body = {
      title,
      description,
      price,
      uploadedFileCloudinaryUrl,
      id
    };

    axios.patch("/postPatch", body).then(res => {
      this.props.history.push("/");
    });
  }

  deletePost() {
    axios.delete(`/deletePost/${this.state.id}`).then(response => {
      response.data;
      this.getProduct();
    });
  }
  render() {
    let { description, title, price, photo } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container-fluid edit-post-container">
          <div className="col-md-3 edit-post-photo-container">
            <div className="text-center">
              <img
                src={photo}
                className="avatar img-circle profile-picture"
                alt="avatar"
              />
              {/* <h6 className="profile-photo-upload">
                Upload a different photo...
              </h6>
              <input type="file" className="form-control no-file-chosen" /> */}
            </div>
          </div>
          <br />
          {this.state.uploadedFileCloudinaryUrl === "" ? (
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={e => this.onImageDrop(e)}
            >
              <p>
                Drop an image or click to select a file to upload a different
                photo.
              </p>
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
          <div class="form-group edit-post-input">
            <label for="formGroupExampleInput">Title</label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              value={title}
              onChange={e => this.handleChange("title", e.target.value)}
            />
          </div>
          <div class="form-group edit-post-input">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={description}
              onChange={e => this.handleChange("description", e.target.value)}
            />
          </div>
          <div class="form-group edit-post-price-input">
            <label for="formGroupExampleInput">Price</label>
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
              id="formGroupExampleInput"
              value={price}
              onChange={e => this.handlePrice("price", e.target.value)}
            />
          </div>
          <div className="form-group edit-post-input" id="edit-post-button-container">
            <label className="col-md-3 control-label" />
            <div className="col-md-8" id="edit-post-buttons">
              <input
                type="button"
                className="btn btn-primary"
                id="save-button"
                value="Save Changes"
                onClick={_ => this.patchPost()}
              />
              <span />
              <input
                type="reset"
                className="btn btn-default"
                value="Cancel"
                onClick={e => this.getProduct()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPost;
