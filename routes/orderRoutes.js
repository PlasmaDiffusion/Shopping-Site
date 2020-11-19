const { routes, sequelize } = require("../server");

models = sequelize.models;
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
    res.status(201).send("The order has been placed.");
  }
});

//Reading order(s)
routes.get("/read/orders", async function (req, res) {
  const orders = await models.order.findAll();

  res.status(200).json(orders);
});

//Read orders of a specific user
routes.post("/read/orders", async function (req, res) {
  console.log("Trying to find order with username: " + req.body.username);

  const orders = await models.order.findAll({
    where: { owner: req.body.username },
    //include: { all: true },
  });

  res.status(200).json(orders);
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

//Delete order (but it has to be proccessing)
routes.post("/delete/order/:id", async function (req, res) {
  //Find the order and check if it's proccessing
  const id = req.params.id;
  const orderToCancel = await models.order.findOne({
    where: {
      id: id,
      status: "Proccessing",
    },
  });

  //Now put all products back in stock. Two arrays are needed, one for the ids and one for the amount put in the cart.
  const shopItemIds = req.body.shopItemIds;
  const amountsInCart = req.body.amountsInCart;

  for (let i = 0; i < shopItemIds.length; i++) {
    const shopItem = await models.shopItem.findByPk(shopItemIds[i]);

    //If the item is found, put all items back in stock.
    if (shopItem) {
      await models.shopItem.update(
        { amountInStock: shopItem.amountInStock - amountsInCart[i] },
        {
          where: {
            id: shopItemIds[i],
          },
        }
      );
    }
  }

  //Now destroy the order.
  await orderToCancel.destroy();

  res.status(200).end();
});

module.exports = routes;
