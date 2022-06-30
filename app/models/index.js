const Sequelize = require("sequelize");
var sequelize;
// Configure database
if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(
        process.env.DATABASE_URL,
        {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                }
            }
        }
    )
} else {
    const config = require("../config/db.config.js");
    sequelize = new Sequelize(
        config.DB,
        config.USER,
        config.PASSWORD,
        {
            host: config.HOST,
            dialect: config.dialect,
            operatorAliases: false,
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle,
            }
        }
    );
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.creet = require("../models/creet.model.js")(sequelize, Sequelize);
module.exports = db;