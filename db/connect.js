const monk = require("monk");
const { database } = require("../config");

const db = monk(database);
const urls = db.get("links");
urls.createIndex({ slug: 1 }, { unique: true });
urls.createIndex({ createTime: 1 }, { expireAfterSeconds: 43_200 });
db.then(() => {
  console.log(`Database connected`);
});

module.exports = urls;
