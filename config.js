require("dotenv").config();
module.exports = {
  port: process.env.PORT || 5000,
  database: process.env.MONGO_URL,
};
