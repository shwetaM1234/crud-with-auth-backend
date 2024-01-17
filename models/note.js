module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define("notes", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  // sequelize.sync({force:true})
    return Note;
  };
  