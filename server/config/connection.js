require("dotenv").config();
const Sequelize = require("sequelize");

const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD.trim() : "";

if (!process.env.DB_DIALECT) {
  console.error("Please set DB_DIALECT in your .env file (e.g., mysql, postgres)");
  process.exit(1);
}

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_DATABASE,
      process.env.DB_USERNAME,
      DB_PASSWORD,
      {
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DB_DIALECT || "mysql",
        port: process.env.DB_PORT || 3306,
      }
    );

module.exports = sequelize;
