const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("testdb", "postgres", "root", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

connectDB();

module.exports = sequelize;
