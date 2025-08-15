// Import required packages
const sequelize = require("../config/connection");

const bcrypt = require("bcrypt");

// import models
// Import models
const {
  User,
  Profile,
  Topic,
  Post,
  Reaction,
  Event,
  EventAttendee
} = require("../models");


// import seed data
const usersData = require("./user.json");
const profilesData = require("./profile.json");
const topicsData = require("./topic.json");
const postsData = require("./post.json");
const reactionsData = require("./reaction.json");
const eventsData = require("./event.json");
const attendeesData = require("./eventAttendee.json");

// Seed database
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Hash the password for each user
    for (const user of usersData) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    // Create Users
    const users = await User.bulkCreate(usersData);
    console.log(`Seeded ${users.length} users.`);

    // Create Profiles
    const profiles = await Profile.bulkCreate(profilesData);
    console.log(`Seeded ${profiles.length} profiles.`);

    // Create Topics
    const topics = await Topic.bulkCreate(topicsData);
    console.log(`Seeded ${topics.length} topics.`);

    // Create Posts
    const posts = await Post.bulkCreate(postsData);
    console.log(`Seeded ${posts.length} posts.`);

    // Create Reactions
    const reactions = await Reaction.bulkCreate(reactionsData);
    console.log(`Seeded ${reactions.length} reactions.`);

    // Create Events
    const events = await Event.bulkCreate(eventsData);
    console.log(`Seeded ${events.length} events.`);

    // Create Event Attendees
    const attendees = await EventAttendee.bulkCreate(attendeesData);
    console.log(`Seeded ${attendees.length} event attendees.`);

    console.log("All seed data inserted successfully!");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1); // Exit with error code
  }
};

// Call seedDatabase function
seedDatabase();


