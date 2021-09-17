const { Router } = require("express");
const router = Router();
const getDogs = require("./getDogs");
const temperaments = require("./temperaments");
const dogPost = require("./postDog");

router.use("/dogs", getDogs);
router.use("/dog", dogPost);
router.use("/temperaments", temperaments);

module.exports = router;
