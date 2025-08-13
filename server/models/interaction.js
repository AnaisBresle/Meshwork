const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Interaction = sequelize.define(
  "Interaction",
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
    interactionType: {
      type: DataTypes.ENUM("thanks", "like"),
      allowNull: false,
    },
  },
  {
    tableName: "interactions",
    timestamps: true,
    freezeTableName: true, // ensures table name is exactly 'interactions'
  }
);

module.exports = Interaction;
