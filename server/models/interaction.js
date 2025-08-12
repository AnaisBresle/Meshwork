const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const Interaction = sequelize.define("Interaction", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  interactionType: {
    type: DataTypes.ENUM('thanks', 'like'),
    allowNull: false,
    unique: true,
  },
 
  ///////////////to revisit - unfinished
}, {
  tableName: "interactions",
  timestamps: false // does not add createdAt and updatedAt
});

module.exports = Interaction;
