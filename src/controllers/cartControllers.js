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

exports.deleteCartById = async (req, res) => {
  // Get project id and place in local variable
  const cartId = req.params.cartId;
  // Check if project exists
  const cartToDelete = await Cart.findById(cartId);
  // IF (no project) return Not Found
  // if (!projectToDelete) throw new NotFoundError('This project does not exist')

  // Delete project
  await cartToDelete.delete();

  // Craft our response
  return res.sendStatus(204);
};
