module.exports = (sequelize, DataTypes) => {
    const events = sequelize.define("events", {
        title: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNULL: true,
        },
        recurrencePattern: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        schule:{
            type: DataTypes.JSON,
            allowNULL: false
        },
        endDate:{
            type: DataTypes.DATEONLY,
            allowNULL: false
        }

    })
    events.associate = function (models) {
        events.belongsTo(models.users);
        events.hasMany(models.eventoccurrence, {
            foreignKey: 'eventId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          });
    }
    return events;
}