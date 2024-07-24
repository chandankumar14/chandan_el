const orderDetailsController = require("../_controller/_order_details_controller");
const upload_files = require("../../../middleware/_upload_image")

module.exports = function (app) {
  app.get("/api/v1/all", upload_files.array('file', 1), orderDetailsController.getOrderDetails);
 
}