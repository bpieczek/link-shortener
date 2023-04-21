const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

app.get("/url/:id", (req, res) => {});

app.get("/:id", (req, res) => {});

app.post("/url", (req, res) => {});

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
