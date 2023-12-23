const dotenv = require("dotenv").config();
const Port = process.env.PORT || 5000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const fetched = require("node-fetch");
const keys = require("./config/keys");
const session = require("express-session");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/user.js");
const mobiledata=require("./routes/Mobiledata.js");
const structdata=require("./routes/struct.js");
var MongoDBStore = require("connect-mongodb-session")(session);
require('dotenv').config();

app.use(
  cors(
    {
      origin: [`${process.env.REACT_APP_BACKEND_URL}`, `${process.env.REACT_APP_FRONTEND_URL}`],
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    }
  )
);

mongoose.set("strictQuery", false);
mongoose.connect(keys.mongoURI, () => {
  
});

var store = new MongoDBStore(
  {
    uri: keys.mongoURI,
    collection: "mySessions",
  },
  function (error) {
    if (error) {
    }
  }
);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', "Backend url"); 
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); 
//   next();
// });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.set("trust proxy", 1)
app.use(
  session({
    name: "sessionId",
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "none",
      secure: true,
    },
    store: store,
  })
);


app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get("/",async(req,res,next)=>{
})
app.use("/",mobiledata);
app.use("/",structdata);
app.use("/", userRoutes);
app.get('*', function(req, res){
  res.status(404).send("<body style='background-color:black;'><h1 style='height:100%;width:100%;background-color:black;text-align:center;color:white;'>ERROR 404 <br/> PAGE NOT FOUND</h1></body>");
});
app.listen(Port, () => {
  console.log(`server running ${Port}`);
});
