require("dotenv").config();
var stripe = require("stripe")(process.env.SECRET_KEY_STRIPE)
module.exports = {
  getUserInfo: (req, res) => {
    let db = req.app.get("db");
    let user_id = req.user.id;
    db
      .get_user_info([user_id])
      .then(resp => {
        console.log('user info fetched');
        res.status(200).send(resp[0]);
      })
      .catch(err => {
        console.log("couldnt find user info", err);
        res.status(500).send();
      });
  },
  getProducts: (req, res) => {
    let db = req.app.get("db");
    if (req.user) {
      let id = req.user.id
      db
        .getProducts()
        .then(products => {
          db.getFavorites(id).then(favorites => {
            console.log('got favorites from nested for loop')
            for (let i = 0; i < products.length; i++) {
              for (let j = 0; j < favorites.length; j++) {
                if (products[i].id === favorites[j].product_id) {
                  products[i].is_favorite = true;
                }
              }
            }
          }).then(() => res.status(200).send(products))

          console.log(products)
        })
        .catch(err => {
          console.log("couldnt get products", err);
          res.status(500).send();
        })
    } else {
      db.getProducts().then(products => {
          res.status(200).send(products);
        })
        .catch(err => {
          res.status(500).send()
        })
    };
  },
  getProduct: (req, res) => {
    let db = req.app.get("db");
    let product_id = req.params.product_id;
    db
      .getProduct([product_id])
      .then(product => {
        console.log('got product', product);
        res.status(200).send(product);
      })
      .catch(err => {
        console.log("couldnt get product", err);
        res.status(500).send();
      });
  },
  postAd: (req, res) => {
    let db = req.app.get("db");
    let user_id = req.session.passport.user;
    // console.log("postAd", req.body, user_id);
    let {
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
    } = req.body;
    let body

    db
      .postAd([
        category,
        subcategory,
        subcategory2,
        title,
        description,
        uploadedFileCloudinaryUrl,
        price,
        contact,
        user_id,
        date,
        time, 
        location
      ])
      .then(resp => {
        res.status(200).send(resp[0]);
        console.log("posting ad");
      })
      .catch(err => {
        console.log("post ad", err);
        res.status(500).send();
      });
  },

  userPatch: (req, res) => {
    let db = req.app.get("db");
    let user_id = req.session.passport.user;
    console.log("userpatch", req.body, user_id);
    let {
      first_name,
      last_name,
      username,
      email
    } = req.body;

    db
      .userPatch([first_name, last_name, username, email, user_id])
      .then(resp => {
        res.status(200).send(resp[0]);
        console.log("Profile Updated");
      })
      .catch(() => res.status(500).send());
    console.log("not updated");
  },
  postPatch: (req, res) => {
    let db = req.app.get("db");
    let user_id = req.session.passport.user;
    console.log("postPatch:", req.body);
    let {
      title,
      description,
      price,
      photo,
      id
    } = req.body;

    db
      .postPatch([title,
        description,
        price,
        photo,
        id
      ])
      .then(resp => {
        res.status(200).send(resp[0]);
        console.log("Post Updated");
      })
      .catch(() => res.status(500).send());
    console.log("Post not updated");
  },
  deletePost: (req, res) => {
    let db = req.app.get("db");
    let product_id = req.params.product_id;
    // console.log("deleting post");
    db
      .deletePost([product_id])
      .then(posts => {
        res.status(200).send();
        console.log("post deleted");
      })
      .catch(err => {
        console.log("couldnt delete post", err);
        res.status(500).send();
      });
  },

  getFavorites: (req, res) => {
    let db = req.app.get("db");
    let id = req.user.id;
    // console.log(id, req.params.search_parameter, req.params.search_input);
    db
      .getFavorites(id)
      .then(favorites => {
        console.log("Getting Favorites");
        res.status(200).send(favorites);
      })
      .catch(err => {
        console.log("couldnt find favorites", err);
        res.status(500).send();
      });
  },
  addToFavorites: (req, res) => {
    let db = req.app.get("db");
    let user_id = req.user.id;
    let {
      product_id
    } = req.body;
    console.log("adding favorite");
    db
      .addToFavorites(user_id, product_id)
      .then(users => {
        res.status(200).send(users);
        // console.log("post added");
      })
      .catch(err => {
        // console.log("couldnt add favorite", err);
        res.status(500).send();
      });
  },
  removeFromFavorites: (req, res) => {
    let db = req.app.get("db");
    let user_id = req.user.id;
    let {
      product_id
    } = req.params;
    console.log("Removing favorite", "product id:", product_id);
    db
      .removeFromFavorites(user_id, product_id)
      .then(favorites => {
        res.status(200).send();
        console.log("Removed from Favorites");
      })
      .catch(err => {
        console.log("couldnt remove favorite", err);
        res.status(500).send();
      });
  },
  payment: (req, res, next) => {
    const charge = stripe.charges.create(
      {
        amount: req.body.amount,
        currency: "usd",
        source: req.body.token.id,
        description: "Test charge from Flickr App"
      },
      function(err, charge) {
        if (err) {
          return res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    )}

};