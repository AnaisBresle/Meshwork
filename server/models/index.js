const User = require("./user");
const Profile = require("./profile");
const Event = require("./event");
const EventAttendee = require("./eventAttendee");
const Interaction = require("./interaction");
const Topic = require("./topic");
const Post = require("./post");

// Associations

///Users - Profile
User.hasOne(Profile, {
  foreignKey: "userId", // FK in Profile table
  
});

Profile.belongsTo(User, {
  foreignKey: "userId",
 
});


///Post - Topic
Topic.hasMany(Post, { 
foreignKey: "topicId", 

});

Post.belongsTo(Topic, { 
  foreignKey: "topicId", 
});

///Post - Users

User.hasMany(Post, { 

  foreignKey: "userId", 
});

Post.belongsTo(User, { foreignKey: "userId",

 });


 /// Post - subpost (comments)
Post.hasMany(Post, { 
  as: "comments", 
  foreignKey: "parentId" 
});

Post.belongsTo(Post, { 
as: "parent", foreignKey: "parentId" 
});



///Interactions - User
User.hasMany(Interaction, { 
foreignKey: "userId",  

});

Interaction.belongsTo(User, { 
foreignKey: "userId",

});


/// Post - Interactions
Post.hasMany(Interaction, { 
foreignKey: "postId", 
});

Interaction.belongsTo(Post, { 
foreignKey: "postId", 
});


/// Event - Users (Creation)
User.hasMany(Event, { 
foreignKey: "createdBy", 
});

Event.belongsTo(User, { 
foreignKey: "createdBy", 
});

// EventAttendee - User - Event
User.belongsToMany(Event, {
  through: EventAttendee,
  foreignKey: "userId",
  otherKey: "eventId",
});

Event.belongsToMany(User, {
  through: EventAttendee,
  foreignKey: "eventId",
  otherKey: "userId",
 });

module.exports = {
  User,
  Profile,
  Event,
  EventAttendee,
  Interaction,
  Topic,
  Post
  
};
