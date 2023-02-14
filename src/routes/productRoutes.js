const express = require("express");
const router = express.Router();
const {
  addProductToCart,
  deleteProductInCart,
  getAllProducts,
  getProductById,
} = require("../controllers/productControllers");

router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.post("/:productId", addProductToCart);
router.delete("/:productId", deleteProductInCart);

module.exports = router;
