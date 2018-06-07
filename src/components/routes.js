import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import PostAd from "./PostAd/PostAd";
import Profile from "./Profile/Profile";
import ProductView from "./ProductView/ProductView";
import MyPosts from "./MyPosts/MyPosts";
import EditPost from "./EditPost/EditPost";
import MyFavorites from "./MyFavorites/MyFavorites";

export default (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/PostAd" component={PostAd} />
    <Route exact path="/Profile" component={Profile} />
    <Route exact path="/MyPosts" component={MyPosts} />
    <Route path="/product/:id" component={ProductView} />/>
    <Route path="/editPost/:id" component={EditPost} />/>
    <Route path="/MyFavorites" component={MyFavorites} />/>
  </Switch>
);
