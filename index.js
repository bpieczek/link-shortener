require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const yup = require("yup");
const { nanoid } = require("nanoid");
const app = express();
const monk = require("monk");

const db = monk(process.env.MONGO_URL)
const urls = db.get("links");
urls.createIndex({ slug: 1 }, { unique: true });
db.then(() => {
  console.log(`Database connected`)
})

app.use(helmet({contentSecurityPolicy: false}));
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));


const schema = yup.object().shape({
  slug: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  url: yup.string().trim().url().required(),
});

app.post("/url", async (req, res, next) => {
  let { slug, url } = req.body;
  try {
    if (!slug)
      slug = nanoid(5);
    
      await schema.validate({
      slug,
      url,
    });

    const existing = await urls.findOne({ slug });
    if (existing) {
      throw new Error("Slug in use");
    }

    slug = slug.toLowerCase();

    const newUrl = {
      url,
      slug,
    };

    const created = await urls.insert(newUrl);
    res.json(created);
  } catch (error) {
    next(error);
  }
});

app.get("/:id", async (req, res) => {
  const { id: slug } = req.params;
  try {
    const url = await urls.findOne({ slug });
    if (url) {
      console.log("Dziala");
      res.redirect(url.url);
    }else{
    res.redirect(`/?error=${slug} not found`);
    }
  } catch (error) {
    res.redirect(`/?error=Link not found`);
  }
});

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: error.stack,
  });
  console.log(  res.json({
    message: error.message,
    stack: error.stack,
  }))
});
const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
