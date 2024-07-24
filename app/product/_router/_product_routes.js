const productController = require("../_controller/_product_controller");

module.exports = function (app) {
  app.get("/api/v1/create_product", productController.createProduct);
};
