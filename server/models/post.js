const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    topicId: {
  type: DataTypes.INTEGER,
  allowNull: true, // change from false to true
  references: { model: 'topics', key: 'id' },
  onDelete: 'SET NULL',
},
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "posts",  // self-reference to Post model
        key: "id",
      },
      onDelete: "CASCADE",
    },
     title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",  // capitalized
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "posts",
    timestamps: true,
    freezeTableName: true,
  },
);

module.exports = Post;
