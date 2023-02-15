const Cart = require("../models/Cart");

exports.getAllCarts = async (req, res) => {
  try {
    //hitta alla carts
    const carts = await Cart.find();

    //response, alla carts
    return res.status(200).json(carts);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCartById = async (req, res) => {
  try {
    //lägger in mitt cartId i en variabel
    const cartId = req.params.cartId;

    //hittar specifik cart med hjälp av cartId
    const cart = await Cart.findById(cartId);

    //felmeddelande om ingen cart hittas - NOT FOUND
    if (!cart) return res.status(404);

    //response - specifik Cart
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.createNewCart = async (req, res) => {
  try {
    //lägger totalamount från Cart i en variabel
    const totalamount = req.body.totalamount;

    //skapar ny cart
    const newCart = await Cart.create({
      totalamount: totalamount,
    });

    //response ny cart som skapas i mongoDB
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
  try {
    //lägger mitt cartId i en variabel
    const cartId = req.params.cartId;
    // hittar Carten med mitt ID
    const cartToDelete = await Cart.findById(cartId);
    // Om det inte fungerar - return Not Found
    if (!cartToDelete) return res.sendStatus(404);

    // raderar cart
    await cartToDelete.delete();

    // return att det fungerade, success.
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
