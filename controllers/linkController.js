const { nanoid } = require("nanoid");
const urls = require("../db/connect.js");
const schema = require("../db/schema.js");

class linkController {
  async saveLink(req, res, next) {
    let { slug, url } = req.body;
    try {
      if (!slug) {
        slug = nanoid(5).toLowerCase();
        let existing = await urls.findOne({ slug });

        while (existing) {
          slug = nanoid(5).toLowerCase();
          existing = await urls.findOne({ slug });
        }
      }

      await schema.validate({ slug, url });

      const existing = await urls.findOne({ slug });

      if (existing) throw new Error("Slug in use");

      const newUrl = { url, slug };

      const created = await urls.insert(newUrl);
      res.json(created);
    } catch (error) {
      next(error);
    }
  }

  async redirecting(req, res) {
    const { id: slug } = req.params;
    try {
      const url = await urls.findOne({ slug });

      if (url) res.redirect(url.url);
      else res.redirect(`/?error=${slug} not found`);
    } catch (error) {
      res.redirect(`/?error=Link not found`);
    }
  }
}

module.exports = new linkController();
