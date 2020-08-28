const { routes, sequelize } = require("../server");

models = sequelize.models;

//Creating user
routes.post("/create/user", async function (req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    await models.user.create(req.body);
    res.status(201).end();
  }
});

//Reading user(s)
routes.get("/read/users", async function (req, res) {
  const users = await models.user.findAll();

  res.status(200).json(users);
});

routes.get("/read/user/:id", async function (req, res) {
  const id = req.params.id;
  const user = await models.user.findByPk(id);
  res.status(200).json(user);
});

//Updating user
routes.post("/update/users/:id", async function (req, res) {
  const id = req.params.id;
  const user = await models.user.findByPk(id);
  if (req.body.id === id) {
    await models.user.update(req.body, {
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

//Delete user
routes.post("/delete/user/:id", async function (req, res) {
  const id = req.params.id;
  await models.user.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).end();
});

module.exports = routes;
