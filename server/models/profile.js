const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // adjust the path to your Sequelize instance

const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true
  },
  picture: {
    type: DataTypes.STRING, // Store an image URL or file path
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isUrl: true }
  },

   linkedIn: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isUrl: true }
  },

  ///////////////Will need to add something for kudos feature
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // must match the name of your User table
      key: "id"
    },
    onDelete: "CASCADE"
  }
}, {
  tableName: "profiles",
  timestamps: true // adds createdAt and updatedAt
});

module.exports = Profile;
