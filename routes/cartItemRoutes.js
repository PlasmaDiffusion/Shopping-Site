const { routes, sequelize } = require("../server");

models = sequelize.models;

//Creating cart item
routes.post("/create/cartItem/", async function (req, res) {
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

//Reading cart item(s) that belong to a cart of a given id
routes.get("/read/cartItems/:cartId", async function (req, res) {
  const cartItems = await models.cartItem.findAll({
    where: { cartId: req.params.cartId },
  });

  var responseData = [];

  //Read in information the shopItemId
  for (let i = 0; i < cartItems.length; i++) {
    let product = await models.shopItem.findByPk(cartItems[i].shopItemId);

    responseData.push({
      //Regular cart item stuff
      id: cartItems[i].id,
      cartId: cartItems[i].cartId,
      shopItemId: cartItems[i].shopItemId,
      amountInCart: cartItems[i].amountInCart,
      //Information on the product

      name: product.name,
      description: product.description,
      price: product.price,
      imageLink: product.imageLink,
      amountInStock: product.amountInStock,
      productId: product.id,
    });
  }

  res.status(200).json(responseData);
});

routes.get("/read/cartItem/:id", async function (req, res) {
  const id = req.params.id;
  const cartItem = await models.cartItem.findByPk(id);

  //Use cartItem.shopItemId to read in item details on the client side

  res.status(200).json(cartItem);
});

//Updating cart item (i.e. update the amount in cart)
routes.post("/update/cartItem/:id", async function (req, res) {
  const id = req.params.id;

  if (req.body.id == id) {
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
routes.post("/delete/cartItem/", async function (req, res) {
  const id = req.body.id;

  await models.cartItem.destroy({
    where: {
      id: id,
    },
  });

  //After deleting make sure to change the amount in stock
  const shopItem = await models.shopItem.findByPk(req.body.shopItemId);

  await models.shopItem.update(
    { amountInStock: shopItem.amountInStock + req.body.amountInCart },
    {
      where: {
        id: req.body.shopItemId,
      },
    }
  );

  res.status(200).end();
});

module.exports = routes;
