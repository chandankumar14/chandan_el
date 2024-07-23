const db = require("../../../models/index");
const order_details_model = db.order_details;
exports.getOrderDetails = async (req, res) => {
  try {
    const { user_id } = req.body;
    const orderDetailsList = await order_details_model.findOne({
      where: {
        user_id: user_id,
        isDeleted: false,
      },
    });

    if (orderDetailsList) {
      return res.status(403).send({
        code: 403,
        orderDetailsList: orderDetailsList,
        message: "Order Details Fetch Successfully..",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send({ code: 500, message: "Internal Server Error" });
  }
};
