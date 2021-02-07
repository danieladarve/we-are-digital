const express = require("express");
const path = require("path");

const expressSession = require("express-session");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const bodyParser = require("body-parser");

require("dotenv").config();

const apiRouter = require("./routes");

/**
 * App Variables
 */
const app = express();
const env = process.env.NODE_ENV;
const port = env==="production"?5000:8000;
const sessionSecret = process.env.SESSION_SECRET || "acbdefghi";
// This could be a Model, but for simplicity it is set to a .env constant
const bearerToken = process.env.MIX_BEARER_TOKEN || "1234";

/**
 * Session Configuration
 */
const session = {
  secret: sessionSecret,
  cookie: {},
  resave: false,
  saveUninitialized: false
};

/**
 * Passport Configuration
 */
const strategy = new BearerStrategy(
    function(token, done) {
      if(token !== bearerToken){
        return done(null, false, { message: 'not authorized' });
      }
      return done(null, true);
    }
);
  
/**
 *  App Configuration & Middlewares
 */
app.use(express.static(path.join(__dirname, '/../../public')));
// console.log('yo ',path.join(__dirname, '/../../public'))
// app.use('/public', express.static(path.join(__dirname, '/../../public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());


// Mount Router
app.use("/", apiRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});