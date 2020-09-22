var assert = require("assert");

const { sequelize } = require("../server");
const { Op } = require("sequelize");

models = sequelize.models;

var tests = 0;

// Will run after every test in every file
afterEach(function () {
  tests++;
  if (tests >= 8) {
    sequelize.close();
    console.log("Sequlize connection closed");
  }
});

//ShopItem read testing -----------------------------------------------------------------------------------
describe("The shopItem model object using find", function () {
  it("should not be null with id 1", async function () {
    const shopItem = await models.shopItem.findByPk(1);

    assert.notStrictEqual("undefined", shopItem);
  });
});

describe("The shopItem model object using findAll", function () {
  it("should not be null", async function () {
    const shopItems = await models.shopItem.findAll();

    assert.notEqual("undefined", shopItems);
  }),
    it("should get multiple items", async function () {
      const shopItems = await models.shopItem.findAll();

      assert.ok(shopItems.length > 1, "Length is " + shopItems.length);
    });
});

describe("The shopItem model object using findAll with LIKE", function () {
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

//Cart read testing -----------------------------------------------------------------------------------
describe("The cart model object using find", function () {
  it("should not be null with id 1", async function () {
    const cart = await models.cart.findByPk(1);

    assert.notStrictEqual("undefined", cart);
  });
});
//------------------------------------------------------------------------------------------------------

//Category read testing ----------------------------
describe("The category model object using find", function () {
  it("should not be null with id 1", async function () {
    const category = await models.category.findByPk(1);

    assert.notStrictEqual("undefined", category);
  });
});
//-----------------------------------------------------
