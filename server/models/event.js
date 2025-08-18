const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    eventTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    type: {
      type: DataTypes.ENUM("in-person", "online"),
  allowNull: false,
},

     link: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdBy: {
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
    tableName: "events",
    timestamps: true,
    validate: {
      async locationOrLinkRequired() {
        if (this.type === "in-person" && !this.location) {
          throw new Error("Location is required for in-person events.");
        }
        if (this.type === "online" && !this.link) {
          throw new Error("Link is required for online events.");
        }
  },
},
  }
);

module.exports = Event;
