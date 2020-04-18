module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }   
    },
    email: {
      validate: {
        len: [1]
      },
      type: DataTypes.STRING
    },
    services: {
      validate: {
        len: [1]},
      type: DataTypes.TEXT
    },
    location: {
      validate: {
        len: [1]},
      type: DataTypes.STRING
    },
    
    // phone: {
    //   type: DataTypes.INTEGER
    // },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  });
  Post.sync();
  return Post;
};
