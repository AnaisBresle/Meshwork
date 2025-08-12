const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isHelpRequest: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // must match the name of your User table
      key: "id"
    },
    onDelete: "CASCADE"
  }
}, {
  tableName: "posts",
  timestamps: true // adds createdAt and updatedAt
});

module.exports = Post;
