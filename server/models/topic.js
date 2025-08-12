const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const Topic = sequelize.define("Topic", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
  
}, {
  tableName: "topic",
  timestamps: false // does not add createdAt and updatedAt
});

module.exports = Topic;
