module.exports = (sequelize, DataTypes) => {
    const eventoccurrence = sequelize.define("eventoccurrence", {
        date: {
            type: DataTypes.DATEONLY,
            allowNULL: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNULL: false,
        },
        pills:{
            type: DataTypes.INTEGER,
            allowNULL: false,
        }

    })
    eventoccurrence.associate = function(models) {
        eventoccurrence.belongsTo(models.events, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      };
    return eventoccurrence;
}   