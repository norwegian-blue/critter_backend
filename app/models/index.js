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
// User-Creets author association
db.user.hasMany(db.creet, {
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
});
db.creet.belongsTo(db.user, {
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
});
// Creet-Creet recreet association
db.creet.belongsTo(db.creet, { 
    as: 'reCreet', 
});
// User-Creet likes associations
db.creet.belongsToMany(db.user, { through: "creetUserLikes", as: "likes" });

module.exports = db;