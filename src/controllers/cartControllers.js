const Cart = require("../models/Cart");

exports.getAllCarts = async (req, res) => {
  const carts = await Cart.find();

  return res.json(carts);
};

exports.getCartById = async (req, res) => {
  const cartId = req.params.cartId;
  const cart = await Cart.findById(cartId);

  return res.json(cart);
};

exports.createNewCart = async (req, res) => {
  try {
    const totalamount = req.body.totalamount;

    const newCart = await Cart.create({
      totalamount: totalamount,
    });

    return res
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/carts/${newCart._id}`
      )
      .status(201)
      .json(newCart);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
