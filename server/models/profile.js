const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },
    linkedIn: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",  // **capitalized**
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "profiles",
    timestamps: true,
  }
);

module.exports = Profile;
