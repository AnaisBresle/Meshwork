const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js"); 

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  topicId: {
    type: DataTypes.INTEGER, // or UUID if Topic uses UUID
    allowNull: false,
    references: {
      model: 'Topics',  // your topics table name
      key: 'id',
    },
    onDelete: 'SET NULL', // or CASCADE depending on your rules
  },

  
parentId: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: 'Posts', // self-reference to the posts table - means comments are also part of this table. 
    key: 'id'
  },
  onDelete: 'CASCADE' // choose 'SET NULL' or 'CASCADE' as per your needs
},
 
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
 

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
  tableName: "posts",
  timestamps: true // adds createdAt and updatedAt
});

module.exports = Post;
