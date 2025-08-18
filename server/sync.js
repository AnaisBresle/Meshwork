const sequelize = require('./config/connection');
const { User, Topic, Profile, Post, Event, EventAttendee, Reaction } = require('./models');

async function syncDB() {
  try {
    // Sync tables in order based on dependencies
    await Topic.sync({ force: true });
    await User.sync({ force: true });
    await Profile.sync({ force: true }); // if Profile references User
    await Post.sync({ force: true });    // depends on User + Topic
    await Event.sync({ force: true });
    await EventAttendee.sync({ force: true }); // depends on Event + User
    await Reaction.sync({ force: true });      // depends on Post + User

    console.log('Database synced - All tables dropped and recreated.');
  } catch (err) {
    console.error('Error syncing database:', err);
  } finally {
    await sequelize.close();
  }
}

syncDB();
