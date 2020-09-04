var assert = require("assert");

const { routes, sequelize } = require("../server");
const { Op } = require("sequelize");

models = sequelize.models;

//ShopItem read testing -----------------------------------------------------------------------------------
describe("The shopItem model object using find", async function () {
  it("should not be null with id 1", async function () {
    const shopItem = await models.shopItem.findByPk(1);

    assert.notEqual("undefined", shopItem);
  });
});

describe("The shopItem model object using findAll", async function () {
  it("should not be null", async function () {
    const shopItems = await models.shopItem.findAll();

    assert.notEqual("undefined", shopItems);
  }),
    it("should get multiple items", async function () {
      const shopItems = await models.shopItem.findAll();

      assert.ok(shopItems.length > 1, "Length is " + shopItems.length);
    });
});

describe("The shopItem model object using findAll with LIKE", async function () {
  it("should get multiple items", async function () {
    // SELECT * FROM shopItem WHERE name LIKE %search keyword%
    var foundItems = await models.shopItem.findAll({
      where: {
        name: { [Op.substring]: "a" },
      },
    });

    assert.ok(foundItems.length > 1, "Length is " + foundItems.length);
  });
});
//------------------------------------------------------------------------------------------------------
