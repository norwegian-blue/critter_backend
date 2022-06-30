module.exports = (sequelize, Sequelize) => {
    const Creet = sequelize.define("creets", {
        content: {
            type: Sequelize.STRING,
        },
    });
    return Creet;
};