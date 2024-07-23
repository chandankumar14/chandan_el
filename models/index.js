const config = require("../app/config/_db.config");
const Sequelize = require("sequelize");
/*** Creating Instance of Sequelize for datbase connection  */
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/*********** Definfing all model here ********* */
db.user_module = require("../app/customer/_model/_user_model")(sequelize,Sequelize);
db.order_details = require("../app/orders/_model/_order_model")(sequelize,Sequelize);
/************** Defining relationship between table ************ */
db.user_module.hasMany(db.order_details, {foreignKey :"user_id", onDelete : 'RESTRICT'})


module.exports = db;