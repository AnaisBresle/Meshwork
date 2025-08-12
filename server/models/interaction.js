const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const Interaction = sequelize.define("Interaction", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User", 
      key: "id",
    },
    onDelete: "CASCADE",
  },

  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Post", 
      key: "id",
    },
    onDelete: "CASCADE",
  },


  ///////////////to revisit - unfinished
 interactionType: {
      type: DataTypes.ENUM("thanks", "like"),
      allowNull: false,
    },
 
  
}, {
  tableName: "interactions",
  timestamps: false, // does not add createdAt and updatedAt
  indexes: [
  {
    unique: true,
    fields: ["userId", "postId", "interactionType"], // unique combination - so user can ony have 1 interaction with 1 post. 
  },
],
});

module.exports = Interaction;
