//LOGIQUE Routing
const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuff");
// route de base d'enregistrement du routeur donc '/'

router.post("/", stuffCtrl.createThing);
router.get("/", stuffCtrl.getAllThings);
router.get("/:id", stuffCtrl.getOneThing);
router.put("/:id", stuffCtrl.modifyThing);
router.delete("/:id", stuffCtrl.deleteThing);

module.exports = router;
