const express = require("express");

const {clips,highlights,stories} = require("../controllers/structdata");

const router = express.Router();

router.get("/clips", clips);
router.get("/highlights", highlights);
router.get("/stories", stories);

module.exports = router;
