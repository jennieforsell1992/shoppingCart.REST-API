const express = require("express");
const router = express.Router();
const {
  createNewCart,
  getAllCarts,
  getCartById,
  deleteCartById,
} = require("../controllers/cartControllers");

router.post("/", createNewCart);
router.get("/", getAllCarts);
router.get("/:cartId", getCartById);
router.delete("/:cartId", deleteCartById);

module.exports = router;
