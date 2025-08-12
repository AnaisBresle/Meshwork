const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
   postID: { // Link to the post
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Posts", // must match the name of your User table
      key: "id"
    },
    onDelete: "CASCADE"
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User", // must match the name of your User table
      key: "id"
    },
    onDelete: "CASCADE"
  }
}, {
  tableName: "comments",
  timestamps: true // adds createdAt and updatedAt
});

module.exports = Comment;
