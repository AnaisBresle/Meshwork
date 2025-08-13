const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Topic = sequelize.define(
  "Topic",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "topics",  // **plural, lowercase to match DB table**
    timestamps: false,
  }
);

module.exports = Topic;
