const db = require("../../../model/index");
const productModel = db.product_details;
const productCategories = db.product_categories;

exports.createProduct = async (req, res) => {
  try {
    const {
      product_name,
      price,
      product_description,
      category_id,
      product_size,
      sku_code,
      quantity,
      in_stock,
    } = req.body;
    const saveProductDetails = await productModel.create({
      product_name: product_name,
      product_size: product_size,
      sku_code: sku_code,
      quantity: quantity,
      price: price,
      in_stock: in_stock,
      product_image: req?.file?.filename
        ? req.file.filename
        : req.body.product_image,
      product_description: product_description,
      category_id: category_id,
    });
    if (saveProductDetails) {
      return res.status(200).send({
        code: 200,
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

exports.productList = async (req, res) => {
  try {
    const productList = await productModel.findAll({
      order: [["createdAt", "DESC"]],
    });
    if (productList && productList != undefined) {
      return res.status(200).send({
        code: 200,
        message: "Fetch All productList Successfully",
        data: productList,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};

exports.createProductCategory = async (req, res) => {
  try {
    const { category_name, category_layout } = req.body;
    const CategorySave = productCategories.create({
      category_name: category_name,
      category_banner1: req?.file?.filename
        ? req.file.filename
        : req.body.category_banner1,
      category_layout: category_layout,
    });
    if (CategorySave) {
      return res.status(200).send({
        code: 200,
        message: "category is Created Succssesfully",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, message: error.message || "Server Error" });
  }
};
