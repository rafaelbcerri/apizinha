const express = require('express');
const port = process.env.PORT || 8080;
const db = require("./models/index");
const cors = require("cors");

//Sync database
db.sequelize.sync();

const Util = require('./util');
const Passport = require('./routes/authentication').passport;

//Initiate express
const app = express();

app.use(require('morgan')('combined')); //HTTP request logger

var corsOptions = {
  origin: true,
  methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE,HEAD",
  allowedHeaders: ['Content-Type'],
  credentials : true
 }
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('express-session')({
  secret: 'banana peixinho',
  resave: true,
  saveUninitialized: true 
}));

app.use(Passport.initialize());
app.use(Passport.session());

//Routes authorization
app.use(function (req, res, next) {
  if (!req.isAuthenticated() && !(Util.isAllowedPath(req.path))) {
    return res.sendStatus(401);
  } else {
    next();
  }
});

app.use(require("./routes"))

app.listen(port);

console.log(`Server started on port - ${port}`);