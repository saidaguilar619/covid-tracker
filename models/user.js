module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    services: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // ,
    // phone: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  });
  User.sync();
  return User;
};
