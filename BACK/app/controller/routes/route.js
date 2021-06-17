let express = require("express");
let teamController = require("../team_controller");
let home = require("../home");
let router = express.Router();

router.get("/", home.test);
router.post("/team", teamController.save);
router.put("/team/:id", teamController.save);
router.delete("/team/:id", teamController.delete);
router.get("/teams", teamController.find);

module.exports = router;