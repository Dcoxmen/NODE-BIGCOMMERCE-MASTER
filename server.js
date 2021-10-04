require("dotenv").config();
const expressHbs = require("express-handlebars");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require('./config/db')

const app = express();



//Connect DB
connectDB()

require('./models/Reseller');
require('./models/upload_file');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars Helpers
const { truncate, select } = require("./helpers/hbs");

app.engine(
  "handlebars",
  expressHbs({
    helpers: {
      truncate: truncate,
      select: select,
    },
    defaultLayout: "main"
   
  })
);
app.set("view engine", "handlebars");
app.set("views", "views");
// Set static folder
app.use(express.static(path.join(__dirname, "public")));


const indexRoutes = require("./routes/home");
const productsRoutes = require("./routes/products");



app.use("/", indexRoutes);
app.use("/products", productsRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Express Server Now Running On localhost ${PORT}`)
);
