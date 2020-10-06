const { routes, sequelize } = require("../server");

models = sequelize.models;
//TODO: Update order needs to be called when users want to cancel them, and when admins need to mark their status
//Creating order
routes.post("/create/order", async function (req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    await models.order.create(req.body);
    res.status(201).end();
  }
});

//Reading order(s)
routes.get("/read/orders", async function (req, res) {
  const orders = await models.order.findAll();

  res.status(200).json(orders);
});

//Read a order of a specific user, or create one if it is yet to exist
routes.post("/read/order", async function (req, res) {
  console.log("Trying to find order with username: " + req.body.username);

  const [order, created] = await models.order.findOrCreate({
    where: { owner: req.body.username },
    defaults: {
      owner: req.body.username,
      totalPrice: 0.0,
    },
  });

  if (created) console.log("New order created!");

  res.status(200).json(order);
});

//Updating order
routes.post("/update/order/", async function (req, res) {
  const id = req.body.id;
  if (id) {
    //Update the order data here
    await models.order.update(req.body, {
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

//Delete order
routes.post("/delete/order/:id", async function (req, res) {
  const id = req.params.id;
  await models.order.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).end();
});

module.exports = routes;
