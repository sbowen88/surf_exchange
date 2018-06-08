require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  Auth0Strategy = require("passport-auth0"),
  massive = require("massive"),
  checkLoggedIn = require("./middleware"),
  ctrl = require("./controller");
  stripe = require("stripe")(process.env.SECRET_KEY_STRIPE)

const {
  SERVER_PORT,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  CONNECTION_STRING,
  SUCCESS_REDIRECT,
  FAILURE_REDIRECT,
  AUTH0
} = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
  console.log("database connection established");
  app.set("db", db);
});

app.use(express.static(__dirname + "./../build"));
app.use(bodyParser.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new Auth0Strategy({
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: "openid profile"
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      //db calls
      console.log('authed')
      const db = app.get("db");
      let picture = `https://robohash.org/${Math.floor(
        (Math.random() + 1) * 1000
      )}`;
      db.find_user([profile.id]).then(userResult => {
        console.log('checked user')
        if (!userResult[0]) {
          // console.log(profile);
          db
            .create_user([
              profile.id,
              picture,
              profile.name.givenName,
              profile.name.familyName
            ])
            .then(createUser => {
              console.log('created user')
              return done(null, createUser[0].id);
            });
        } else {
          console.log('user existed', profile)
          return done(null, userResult[0].id);
        }
      });
      //arguments in an array with massive
    }
  )
);
passport.serializeUser((id, done) => {
  // console.log('user serialized')
  //takes whatever info (profile) and puts it on session, gets invoked once
  done(null, id);
}); ///runs once on login
//runs before each endpoint is hit, after login
passport.deserializeUser((id, done) => {

  app
    .get("db")
    .find_session_user([id])
    .then(loggedInUser => {
      done(null, loggedInUser[0]); //loggedInUser[0]
    }).catch(err => console.log('err', err))
});

app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
  })
);
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
  })
);
app.get("/auth/me", function (req, res) {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send("nice try sucka!");
  }
});

app.get("/auth/logout", function (req, res) {
  console.log("loggin out ");
  req.logOut();

  res.redirect(
    // 'http://casurfexchange.com'
    302,
    // `https://scottblank.auth0.com/v2/logout?returnTo=http%3A%2F%2F${AUTH0}`
    // 'https://scottblank.auth0.com/v2/logout?returnTo=http%3A%2F%2Fcasurfexchange.com'
   `https://scottblank.auth0.com/v2/logout?returnTo=http%3A%2F%2Fwww.casurfexchange.com&client_id=${CLIENT_ID}`

  );
});
app.get("/checkLoggedIn", checkLoggedIn);
app.get("/getUserInfo", ctrl.getUserInfo);
app.patch("/userPatch", ctrl.userPatch);
app.patch("/postPatch", ctrl.postPatch)
app.post("/postAd", ctrl.postAd);
app.get('/api/getFavorites', ctrl.getFavorites)
app.get('/api/getProducts', ctrl.getProducts)
app.get('/api/product/:product_id', ctrl.getProduct)
app.delete('/deletePost/:product_id', ctrl.deletePost)
app.post("/addToFavorites", ctrl.addToFavorites);
app.delete("/removeFromFavorites/:product_id", ctrl.removeFromFavorites)
app.post('/api/payment', ctrl.payment)
// app.get("/getUsers", ctrl.getUsers);
// app.get("/getRecommended/:sort_parameter/:user_parameter", ctrl.getRecommended);
// app.get("/userSearch/:search_parameter/:search_input", ctrl.userSearch);
// app.delete("/removeFriend/:user_id/:friend_id", ctrl.removeFriend);

app.listen(SERVER_PORT, () => console.log(`listening on port: ${SERVER_PORT}`));