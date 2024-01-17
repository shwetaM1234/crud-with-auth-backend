module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user_data", {
     
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: DataTypes.STRING,
    });
  
    return User;
  };
  