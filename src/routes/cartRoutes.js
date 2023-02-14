const express = require("express");
const router = express.Router();
const {
  createNewCart,
  getAllCarts,
  getCartById,
} = require("../controllers/cartControllers");

router.post("/", createNewCart);
router.get("/", getAllCarts);
router.get("/:cartId", getCartById);

module.exports = router;
