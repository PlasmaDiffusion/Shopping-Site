const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes, Model } = require("sequelize");
const lodash = require("lodash");
const PORT = process.env.PORT || 4000;
const routes = express.Router();
const fs = require("fs");
const path = require("path");
const { applyExtraSetup } = require("./extra-setup");
const db = {};
//const { findPeople, findFamilies } = require("./serverFunctions");
//const router = require("./routes");
const { triggerAsyncId } = require("async_hooks");

//Connection to database
const sequelize = new Sequelize(
  "oJXx5IKlWW",
  "oJXx5IKlWW",
  process.env.DB_PASSWORD,
  {
    host: "remotemysql.com",
    dialect: "mysql",
  }
);

const modelDefiners = [
  require("./models/user"),
  require("./models/cart"),
  require("./models/shopItem"),
  // Add more models here...
  // require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// Choose the port and start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

exports.routes = routes;

app.use(cors());
app.use(bodyParser.json());
app.get("/db", async function (req, res) {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ alter: true }); //Changes all tables to make them match the model
    //console.log(User.getFullName());
    //await User.drop()
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

/*app.use("/", require("./routes/create"));
app.use("/", require("./routes/read"));
app.use("/", require("./routes/update"));
app.use("/", require("./routes/delete"));

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
*/
