const db = require("../../../model/index");
const paymentModel = db.payment_details;

exports.orderList = async (req, res) => {
  try {
    const query = `
        SELECT 
           OD.order_id,
           OD.user_id,
           OD.payment_id,
           UD.first_name,
           UD.middle_name,
           UD.last_name,
           UD.contact_number
           
        FROM order_details OD
        LEFT JOIN user_details ES UD OD.user_id = UD.user_id 
        WHERE OD.order_status = :order_status`;
    const orderList = await db.sequelize.query(query, {
      replacements: { order_status: "COMPLETE" },
      type: db.sequelize.QueryTypes.SELECT,
    });
    if (orderList && orderList != undefined) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All orderList Successfully",
        data: orderList,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const { order_id } = req.body;
    const query = `
        SELECT 
           OD.order_id,
           OD.user_id,
           PD.product_id,
           PD.product_name,
           PD.product_image,
           
        FROM order_details OD
        LEFT JOIN product_details PD OD.product_id = PD.product_id 
        WHERE OD.order_id = :order_id`;
    const orderDetails = await db.sequelize.query(query, {
      replacements: { order_id: order_id },
      type: db.sequelize.QueryTypes.SELECT,
    });

    if (orderDetails && orderDetails != undefined) {
      try {
        const payment_details = await paymentModel.findOne({
          where: { order_id: order_id },
        });
        return res.status(200).send({
          code: 200,
          message: "Fetch All orderDetails Successfully",
          data: orderDetails,
          payment_details: payment_details,
        });
      } catch (error) {
        return res
          .status(500)
          .send({ code: 500, message: error.message || "Server Error" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};
