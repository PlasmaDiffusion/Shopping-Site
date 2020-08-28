const { routes, sequelize } = require("../server");

models = sequelize.models;

//Creating shop item
routes.post("/create/shopItem", async function (req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    await models.shopItem.create(req.body);
    res.status(201).end();
  }
});

//Reading shop item(s)
routes.get("/read/shopItems", async function (req, res) {
  const shopItems = await models.shopItem.findAll();

  res.status(200).json(shopItems);
});

routes.get("/read/shopItem/:id", async function (req, res) {
  const id = req.params.id;
  const shopItem = await models.shopItem.findByPk(id);
  res.status(200).json(shopItem);
});

//Updating shop item
routes.post("/update/shopItems/:id", async function (req, res) {
  const id = req.params.id;
  const shopItem = await models.shopItem.findByPk(id);
  if (req.body.id === id) {
    await models.shopItem.update(req.body, {
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

//Delete shop item
routes.post("/delete/shopItem/:id", async function (req, res) {
  const id = req.params.id;
  await models.shopItem.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).end();
});

module.exports = routes;
