const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const EventAttendee = sequelize.define("EventAttendee", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Event", // must match the name of your User table
      key: "id"
    },
    onDelete: "CASCADE"
  },

  userId: {
    type: DataTypes.INTEGER,  
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },

  status: {
    type: DataTypes.ENUM('registered', 'attended', 'cancelled'),
    defaultValue: 'registered',
  },

}, 

{
  tableName: "attendees",
  timestamps: true // adds createdAt and updatedAt
});

module.exports = EventAttendee;
