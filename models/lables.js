module.exports = (sequelize, DataTypes) => {
    const lables = sequelize.define("lables", {
        title: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNULL: true,
        }

    })
    lables.associate = function (models) {
        lables.belongsTo(models.users);
    }
    return lables;
}