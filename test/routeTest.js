const request = require("supertest");
const { app } = require("../server");
var assert = require("assert");

describe("The category route should read all categories", function () {
  it("should get multiple items", async function () {
    // SELECT * FROM shopItem WHERE name LIKE %search keyword%
    return request(app)
      .get("/read/categories")
      .then(function (response) {
        assert.ok(response.body.length > 1, "Greater than 1?");
        assert.strictEqual(response.body[0].name, "Food");
        assert.strictEqual(response.status, 200);
      });
  });
});
