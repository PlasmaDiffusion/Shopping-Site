const { routes, sequelize } = require("../server");

models = sequelize.models;

//Creating cart item
routes.post("/create/cartItem", async function (req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    await models.cartItem.create(req.body);
    res.status(201).end();
  }
});

//Reading cart item(s)
routes.get("/read/cartItems", async function (req, res) {
  const cartItems = await models.cartItem.findAll();

  res.status(200).json(cartItems);
});

routes.get("/read/cartItem/:id", async function (req, res) {
  const id = req.params.id;
  const cartItem = await models.cartItem.findByPk(id);

  //Use cartItem.shopItemId to read in item details on the client side

  res.status(200).json(cartItem);
});

//Updating cart item
routes.post("/update/cartItems/:id", async function (req, res) {
  const id = req.params.id;
  const cartItem = await models.cartItem.findByPk(id);
  if (req.body.id === id) {
    await models.cartItem.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).end();
  } else {
    res
      .status(400)
      .send(
        `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
      );
  }
});

//Delete cart item
routes.post("/delete/cartItem/:id", async function (req, res) {
  const id = req.params.id;
  await models.cartItem.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).end();
});

module.exports = routes;
