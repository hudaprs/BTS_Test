const router = require("express").Router();
const {
  signup,
  signin,
  getAllUser
} = require("../app/controllers/UserController");
const { auth } = require("../app/middleware/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/", auth, getAllUser);

module.exports = router;
