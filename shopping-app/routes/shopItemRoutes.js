const { routes, sequelize } = require("../server");

models = sequelize.models;

//Creating shop item
routes.post("/create/shopItem", async function (req, res) {
  if (req.body.id || req.body.user != process.env.ADMIN) {
    console.log(req.body.user);
    res.status(400).send(`Bad request. Are you not logged in as an admin?`);
  } else {
    await models.shopItem.create(req.body);
    res.status(201).send(req.body.name + " was added successfully.");
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
routes.post("/update/shopItem/:id", async function (req, res) {
  if (req.body.user != process.env.ADMIN) {
    res.status(400).send(`Not an admin.`);
    return;
  }

  const id = req.params.id;

  const shopItem = await models.shopItem.findByPk(id);
  if (shopItem) {
    await models.shopItem.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).send(req.body.name + " was updated.");
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
  if (req.body.user == process.env.ADMIN) {
    res.status(400).send(`Not an admin.`);
    return;
  }

  const id = req.params.id;
  await models.shopItem.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).end();
});

module.exports = routes;
