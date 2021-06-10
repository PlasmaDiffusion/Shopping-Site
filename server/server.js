const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes, Model } = require("sequelize");
const PORT = process.env.PORT || 4000;
const routes = express.Router();
const path = require("path");
const { applyExtraSetup } = require("./extra-setup");
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

//Put models here --------------------
const modelDefiners = [
  require("./models/cart"),
  require("./models/order"),
  require("./models/cartItem"),
  require("./models/shopItem"),
  require("./models/category"),
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
exports.sequelize = sequelize;

app.use(cors());
app.use(bodyParser.json());
app.get("/db", async function (req, res) {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    //await sequelize.drop();
    await sequelize.sync({ alter: true }); //Changes all tables to make them match the model
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

app.use("/", require("./routes/shopItemRoutes"));
app.use("/", require("./routes/cartItemRoutes"));
app.use("/", require("./routes/cartRoutes"));
app.use("/", require("./routes/categoryRoutes"));
app.use("/", require("./routes/orderRoutes"));

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

exports.app = app;
