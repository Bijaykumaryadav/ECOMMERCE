const express = require("express");
const app = express();
const dbConnection = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./middleware/passport-google-strategy");
require("./middleware/passport-jwt-strategy");
const cors = require("cors");

// for routes to accept the json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    name: "Ecommerce",
    secret: process.env.SESSION_COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
    store: new MongoStore(
      {
        mongoUrl: process.env.MONGO_URI,
      },
      {
        mongooseConnection: dbConnection,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || `successfully added mongostore `);
      }
    ),
  })
);

const corsOptions = {
  origin: [process.env.FRONTEND_URL], // Allow specific origin from environment variable
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
  exposedHeaders: ["Content-Disposition", "Content-Type"],
  allowedHeaders: ["Authorization", "Content-Type"], // Explicitly allow Authorization header
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply CORS middleware
app.use(cors(corsOptions));


//for using passport
app.use(passport.initialize());
app.use(passport.session());
dbConnection();

app.use("/apis/v1",require("./routes"));


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})