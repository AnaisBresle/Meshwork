const User = require("./user");
const Profile = require("./profile");

// Association
User.hasOne(Profile, {
  foreignKey: "userId", // FK in Profile table
  as: "profile"         // optional alias
});

Profile.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});


module.exports = {
  User,
  Profile
};
