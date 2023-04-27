const monk = require("monk");
const { database } = require("../config");

const db = monk(database);
const urls = db.get("links");
urls.createIndex({ slug: 1 }, { unique: true });
db.then(() => {
  console.log(`Database connected`);
});

module.exports = urls;
