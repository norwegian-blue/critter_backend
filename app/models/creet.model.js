module.exports = (sequelize, Sequelize) => {
    const Creet = sequelize.define("creets", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        content: {
            type: Sequelize.STRING,
        },
    });
    return Creet;
};