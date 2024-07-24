const db = require("../../../model/index");
const productModel = db.product_details;

exports.createProduct = async (req, res) => {
  try {
    const { product_name, product_size, sku_code, quantity, in_stock } =
      req.body;
    const saveProductDetails = await productModel.create({
      product_name: product_name,
      product_size: product_size,
      sku_code: sku_code,
      quantity: quantity,
      in_stock: in_stock,
    });
    if (saveProductDetails) {
      return res.status(200).send({
        code: 200,
        ProductDetails: saveProductDetails,
        message: "product is Created Succssesfully",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_size,
      sku_code,
      quantity,
      in_stock,
      product_id,
    } = req.body;
    const updateProductDetails = await productModel.update(
      {
        product_name: product_name,
        product_size: product_size,
        sku_code: sku_code,
        quantity: quantity,
        in_stock: in_stock,
      },
      { where: { product_id: product_id } }
    );
    if (updateProductDetails) {
      return res.status(200).send({
        code: 200,
        ProductDetails: updateProductDetails,
        message: "product is updated Succssesfully",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params.product_id;
    const deleteProduct = await productModel.update(
      {
        isDeleted: 1,
      },
      { where: { product_id: product_id } }
    );
    if (deleteProduct) {
      return res.status(200).send({
        code: 200,
        deleteProduct: deleteProduct,
        message: "product is deleted Succssesfully",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};
