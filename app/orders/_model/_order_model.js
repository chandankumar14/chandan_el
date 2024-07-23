module.exports = (sequelize, Sequelize) => {
  const orderModels = sequelize.define(
    "order_details",
    {
      order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // Basic detail start
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'user_details',
            key: 'user_id',
        }
      },
      payment_id: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "--",
      },
      product_id:{
        type:Sequelize.STRING,
        allowNull:false
      },
      order_status: {
        type: Sequelize.ENUM("COMPLETE", "INCOMPLETE","INPROGRESS"),
        defaultValue: "INPROGRESS",
      },
      // Personal details start
      delivery_address: {
        type: Sequelize.TEXT,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN(true, false),
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return orderModels;
};
