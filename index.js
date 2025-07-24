const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const router = require("./routes/api.js");
const { port } = require("./config.js");

const app = express();

app.use(
  helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })
);
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

app.use(router);

app.use((error, req, res, next) => {
  if (error.status) res.status(error.status);
  else res.status(500);

  res.json({ message: error.message, stack: error.stack });
});

app.get("/health", (req, res) => res.status(200).send("OK"));

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
