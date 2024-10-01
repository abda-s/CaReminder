module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNULL:false
        }
    })

    return users;
}