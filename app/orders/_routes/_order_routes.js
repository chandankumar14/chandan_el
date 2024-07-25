const orderDetailsController = require("../_controller/_order_details_controller");


module.exports = function (app) {
  app.get("/api/v1/all",  orderDetailsController.getOrderDetails);
 
}