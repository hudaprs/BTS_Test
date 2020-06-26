const router = require("express").Router();
const {
  getAllShopping,
  createShopping,
  getShoppingById,
  updateShopping,
  deleteShopping
} = require("../app/controllers/ShoppingController");
const { auth } = require("../app/middleware/auth");

router.get("/", auth, getAllShopping);
router.post("/", createShopping);
router.get("/:id", auth, getShoppingById);
router.put("/:id", updateShopping);
router.delete("/:id", auth, deleteShopping);

module.exports = router;
