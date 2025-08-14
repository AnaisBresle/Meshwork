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
  Interaction,
  Event,
  EventAttendee
} = require("../models");


// import seed data
const usersData = require("./user.json");
const profilesData = require("./profile.json");
const topicsData = require("./topic.json");
const postsData = require("./post.json");
const interactionsData = require("./interaction.json");
const eventsData = require("./event.json");
const attendeesData = require("./eventAttendee.json");

// Seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const categories = await Category.bulkCreate(categoriesData);

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

    // Create Interactions
    const interactions = await Interaction.bulkCreate(interactionsData);
    console.log(`Seeded ${interactions.length} interactions.`);

    // Create Events
    const events = await Event.bulkCreate(eventsData);
    console.log(`Seeded ${events.length} events.`);

    // Create Event Attendees
    const attendees = await EventAttendee.bulkCreate(attendeesData);
    console.log(`Seeded ${attendees.length} event attendees.`);

    console.log("All seed data inserted successfully!");
    process.exit(0);

  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(0);

 }

// Call seedDatabase function
seedDatabase();


