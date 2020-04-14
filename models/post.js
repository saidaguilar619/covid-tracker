module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      },
      allowNull: false,
    },
    email: {
      validate: {
        len: [1]
      },
      allowNull: false,
      type: DataTypes.STRING
    },
    services: {
      validate: {
        len: [1]},
      allowNull: false,
      type: DataTypes.TEXT
    },
    location: {
      validate: {
        len: [1]},
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      validate: {
        len: [1]},
      allowNull: false,
      type: DataTypes.INTEGER
    },
    id: {
      primaryKey: true,
      validate: {
        len: [1]},
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  return Post;
};
