import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from "./../Navbar/Navbar";
import './MyPosts.css';



class MyPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            user:[]
        };
    }
    componentDidMount(){
        axios.get("/getUserInfo").then(resp => {
            this.setState({user:resp.data});
            console.log('this is the users id',resp.data.id)
        })
        axios.get("/api/getProducts").then(products => {
            this.setState({ products: products.data });
          });
       
    }
    getProducts(){
        axios.get("/api/getProducts").then(products => {
            this.setState({ products: products.data });
          });
    }
    deletePost(id){
        axios.delete(`/deletePost/${id}`).then(response => {
            response.data;
            this.getProducts();
          });
      }
    
    render() {
        let myPosts = this.state.products.filter(product=>{
            return product.user_id ===this.state.user.id
        })
        let renderMyPosts = myPosts.map((product, i) => {
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
                <div className="card-body myPosts-card-body">
                  
                    <Link className="edit-post-button"to={`/editPost/${product.id}`} key={i}>
                      EDIT
                    </Link>
                  
                  <label for="id-of-input" className="custom-checkbox">
                    <input type="checkbox" id="id-of-input"/>
                    <span className='delete-button' onClick={_=>this.deletePost(product.id)}>DELETE</span>
                  </label>
                  <p className = "post-date">posted on {product.date}</p>
                </div>
              </div>
            );
          });
        return (
            <div>
                <h1>My Posts</h1>
                <Navbar/>
                <br/>
               <div className="container-fluid" id="card-container">
               {renderMyPosts}
               </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    let {user}=state
    return {
        user
    };
}
export default connect(
    mapStateToProps,
)(MyPosts);