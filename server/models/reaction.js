const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Reaction = sequelize.define(
  "Reaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // matches User table
        key: "id",
      },
      onDelete: "CASCADE",
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts", // ✅ must match Post tableName exactly
        key: "id",
      },
      onDelete: "CASCADE",
    },
    reactionType: {
      type: DataTypes.ENUM("like", "celebrate", "support", "love", "insightful", "curious"),
      allowNull: false,
    },

  },
  {
    tableName: "reactions",
    timestamps: true,
    freezeTableName: true, // ensures table name is exactly 'reactions'
  }
);

module.exports = Reaction;
