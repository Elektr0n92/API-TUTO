//LOGIQUE Routing
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const stuffCtrl = require("../controllers/stuff");
// route de base d'enregistrement du routeur donc '/'

router.post("/", auth, stuffCtrl.createThing);
router.get("/", stuffCtrl.getAllThings);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);

module.exports = router;
