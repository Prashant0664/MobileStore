const express = require("express");

const {sales,featured,topratedsales, fetchphone, fetchphoneonly } = require("../controllers/mobiledata");

const router = express.Router();

router.get("/sales", sales);
router.get("/topratedsales", topratedsales);
router.get("/featured", featured);
router.post("/fetchphone", fetchphone);
router.post("/fetchphoneonly", fetchphoneonly);

module.exports = router;
