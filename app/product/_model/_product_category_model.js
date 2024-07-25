module.exports = (sequelize, Sequelize) => {
  const orderModels = sequelize.define(
    "product_categories",
    {
      category_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_banner1: {
        type: Sequelize.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return orderModels;
};
