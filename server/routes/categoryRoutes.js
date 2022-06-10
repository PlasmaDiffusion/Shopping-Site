const { routes, sequelize } = require("../server");
const { Op } = require("sequelize");

models = sequelize.models;

//Creating shop item
routes.post("/create/category", async function (req, res) {
  if (req.body.id || req.body.user != process.env.ADMIN) {
    res.status(400).send(`Bad request. Are you not logged in as an admin? Also DO NOT provide a category id.`);
  } else {
    await models.category.create(req.body);
    res.status(201).send(req.body.name + " was added successfully.");
  }
});

//Reading shop item(s)
routes.get("/read/categories", async function (req, res) {
  const categories = await models.category.findAll();

  res.status(200).json(categories);
});

//Reading shop item(s) from search terms
routes.get("/read/categories/:search", async function (req, res) {
  const search = req.params.search;

  // SELECT * FROM category WHERE name LIKE %search keyword%
  var foundItems = await models.category.findAll({
    where: {
      name: { [Op.substring]: search },
    },
  });

  res.status(200).json(foundItems);
});

routes.get("/read/category/:id", async function (req, res) {
  const id = req.params.id;
  const category = await models.category.findByPk(id);
  res.status(200).json(category);
});

//Updating shop item
routes.post("/update/category/:id", async function (req, res) {
  if (req.body.user != process.env.ADMIN) {
    res.status(400).send(`Not an admin.`);
    return;
  }

  const id = req.params.id;

  const category = await models.category.findByPk(id);
  if (category) {
    await models.category.update(req.body, {
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
routes.post("/delete/category/:id", async function (req, res) {
  if (req.body.user == process.env.ADMIN) {
    res.status(400).send(`Not an admin.`);
    return;
  }

  const id = req.params.id;
  await models.category.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).end();
});

module.exports = routes;
