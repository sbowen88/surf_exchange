import axios from "axios";
const initialState = {
  products: [],
  user: [],
  first_name: "",
  last_name: "",
  email: "",
  search_parameter: "",
  loggedIn: false,
  post_title: "",
  post_description: "",
  post_category: "",
  post_subcategory: "",
  category: "",
  subcategory: "",
  search_input: "",
  myPosts: ""
};

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_USER_INFO = "GET_USER_INFO";
const SELECT_CATEGORY = "SELECT_CATEGORY";
const SELECT_SUBCATEGORY = "SELECT_SUBCATEGORY";
const SELECT_SEARCH_INPUT = "SELECT_SEARCH_INPUT";
const SELECT_MY_POSTS = "SELECT_MY_POSTS";

const CANCEL = "CANCEL";

function reducer(state = initialState, action) {
  // console.log("REDUCER HIT: Action ->", action);

  switch (action.type) {
    case GET_PRODUCTS + "_FULFILLED":
      return Object.assign({}, state, {
        products: action.payload
      });

    case GET_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, {
        user: action.payload
      });

    case SELECT_CATEGORY:
      return Object.assign({}, state, {
        category: action.payload
      });

    case SELECT_SUBCATEGORY:
      return Object.assign({}, state, {
        subcategory: action.payload
      });

    // case SELECT_MY_POSTS:
    //   return Object.assign({}, state, {
    //     myPosts: action.payload
    //   });

    case SELECT_SEARCH_INPUT:
      return Object.assign({}, state, {
        search_input: action.payload,
        subcategory: ""
      });

    case CANCEL:
      return Object.assign({}, action.payload);

    default:
      return state;
  }
}

export function getProducts() {
  console.log("got all products");
  const promise = axios.get(`/api/getProducts`).then(response => response.data);
  return {
    type: GET_PRODUCTS,
    payload: promise
  };
}
export function getUserInfo() {
  console.log("getting user info");
  const promise = axios.get("/getUserInfo").then(response => response.data);
  return {
    type: GET_USER_INFO,
    payload: promise
  };
}
export function cancel() {
  return {
    type: CANCEL,
    payload: initialState
  };
}
export function select_search_input(search_input) {
  console.log(`selecting ${search_input}`)
  return {
    type: SELECT_SEARCH_INPUT,
    payload: search_input
  };
}
export function select_category(category) {
  return {
    type: SELECT_CATEGORY,
    payload: category
  };
}
export function select_subcategory(subcategory) {
  console.log(`selecting ${subcategory}`)
  return {
    type: SELECT_SUBCATEGORY,
    payload: subcategory
  };
}
// export function select_myPosts(myPosts) {
//   console.log(`is my post button clicked? ${myPosts}`)
//   return {
//     type: SELECT_MY_POSTS,
//     payload: myPosts
//   };
// }
export default reducer;