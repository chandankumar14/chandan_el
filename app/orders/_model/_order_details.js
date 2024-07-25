module.exports = (sequelize, Sequelize) => {
  const orderModels = sequelize.define(
    "order_details",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.INTEGER,
        unique: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        unique: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return orderModels;
};
