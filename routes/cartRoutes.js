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

//Read a cart of a specific user, or create one if it is yet to exist
routes.post("/read/cart", async function (req, res) {
  console.log("Trying to find cart with username: " + req.body.username);

  const [cart, created] = await models.cart.findOrCreate({
    where: { owner: req.body.username },
    defaults: {
      owner: req.body.username,
      totalPrice: 0.0,
    },
  });

  if (created) console.log("New cart created!");

  res.status(200).json(cart);
});

//Updating cart
routes.post("/update/cart/", async function (req, res) {
  const id = req.body.id;
  if (id) {
    //Calculate price in cart
    req.body.totalPrice = await calculateTotalPrice(id);

    //Update the cart data here
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

//Prepare the cart for an order, renaming the owner to something else so the user gets a new cart
routes.post("/prepareForOrder", async function (req, res) {
  const id = req.body.id;
  var oldOwner = null;

  const cart = await models.cart.findByPk(id);
  if (cart === null) {
    console.log("Not found!");
  } else {
    oldOwner = cart.owner;
  }

  //Add the cart id onto the owner name, and also count the price again
  if (id && oldOwner) {
    //Calculate price in cart
    req.body.totalPrice = await calculateTotalPrice(id);
    req.body.owner = oldOwner + ":" + id;
    //Update the cart data here
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

//Find the total price in a cart
async function calculateTotalPrice(id) {
  const cartItems = await models.cartItem.findAll({
    where: { cartId: id },
    include: models.shopItem,
  });

  let totalPrice = 0.0;
  //Go through each item in the cart and calculate a price for each one.
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].shopItem.price * cartItems[i].amountInCart;
  }
  return totalPrice;
}

module.exports = routes;
