const express = require("express");
const router = express.Router();

const linkController = require("../controllers/linkController.js");

router.post("/url", linkController.saveLink);
router.get("/:id", linkController.redirecting);

module.exports = router;
