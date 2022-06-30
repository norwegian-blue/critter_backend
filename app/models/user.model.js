module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        userId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        }
    });
    return User;
};