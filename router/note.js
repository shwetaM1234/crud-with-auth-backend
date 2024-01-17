const express = require("express");
const router = express.Router();
const noteController = require("../controller/note");
const isAuth = require("../midelware/auth");
router.get("/notes",isAuth, noteController.read);
router.get("/note/:id",isAuth, noteController.readById);
router.post("/create/note",isAuth, noteController.create);
router.put("/note/:id",isAuth, noteController.updateById);
router.delete("/delete/note/:id",isAuth, noteController.deleteById);



module.exports = router;
