const sequelize = require('./server/config/connection');
const { User, Profile, Post, Topic, Event, EventAttendee, Interaction } = require('./server/models');

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced - All tables dropped and recreated.');
  process.exit();
});
