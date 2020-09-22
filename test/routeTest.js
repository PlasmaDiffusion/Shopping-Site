const request = require("supertest");
const { app } = require("../server");
var assert = require("assert");

describe("The category route should read all categories", function () {
  it("should get multiple categories", async function () {
    return request(app)
      .get("/read/categories")
      .then(function (response) {
        assert.ok(response.body.length > 1, "Greater than 1?");
        assert.strictEqual(response.body[0].name, "All");
        assert.strictEqual(response.status, 200);
      });
  });
});

describe("The shopItem route should return only items with a specific category", function () {
  it("should get multiple categories", async function () {
    return request(app)
      .get("/read/shopItems/a/Food")
      .then(function (response) {
        assert.ok(response.body.length > 0, "Greater than 0?");
        assert.strictEqual(response.body[0].category, "Food");
        assert.strictEqual(response.status, 200);
      });
  });
});
