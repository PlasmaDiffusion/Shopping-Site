const { routes, sequelize } = require("../server");

models = sequelize.models;

//Creating cart
routes.post("/create/cart", async function (req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    await models.cart.create(req.body);
    res.status(201).end();
  }
});

//Reading cart(s)
routes.get("/read/carts", async function (req, res) {
  const carts = await models.cart.findAll();

  res.status(200).json(carts);
});

routes.get("/read/cart/:id", async function (req, res) {
  const id = req.params.id;
  const cart = await models.cart.findByPk(id);
  res.status(200).json(cart);
});

//Updating cart
routes.post("/update/carts/:id", async function (req, res) {
  const id = req.params.id;
  const cart = await models.cart.findByPk(id);
  if (req.body.id === id) {
    await models.cart.update(req.body, {
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

//Delete cart
routes.post("/delete/cart/:id", async function (req, res) {
  const id = req.params.id;
  await models.cart.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).end();
});

module.exports = routes;
