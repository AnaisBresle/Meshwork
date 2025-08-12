const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  eventDate: {
    type: DataTypes.DATEONLY,  // just the date (YYYY-MM-DD)
    allowNull: false,
  },
  eventTime: {
    type: DataTypes.TIME,      // just the time (HH:mm:ss)
    allowNull: false,
  },

  location:{ 
    type: DataTypes.STRING,
    allowNull: false
  },

  createdby: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User", // must match the name of your User table
      key: "id"
    },
    onDelete: "CASCADE"
  }
}, {
  tableName: "events",
  timestamps: true // adds createdAt and updatedAt
});

module.exports = Event;
