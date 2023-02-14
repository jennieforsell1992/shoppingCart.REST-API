const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  return res.json(products);
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);

  return res.json(product);
};

// exports.createNewProduct = async (req, res) => {
//   try {
//     const productName = req.body.productName || "";
//     const price = req.body.price;

//     const newProduct = await Product.create({
//       productName: productName,
//       price: price,
//     });

//     return res
//       .setHeader(
//         "Location",
//         `http://localhost:${process.env.PORT}/api/v1/products/${newProduct._id}`
//       )
//       .status(201)
//       .json(newProduct);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

exports.addProductToCart = async (req, res) => {
  try {
    const productName = req.body.productName || "";
    // const price = req.params.price;
    const id = req.body.id;
    const productId = req.params.productId;

    const cartList = await Cart.findById(id);

    if (!productName) {
      return res.status(400).json({
        message: "You must provide a product name",
      });
    }
    const productItem = await Product.findById(productId);

    cartList.cart.push(productItem);

    await cartList.save();

    return res.status(201).json(productItem);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteProductInCart = async (req, res) => {
  try {
    const id = req.body.id;
    const productId = req.params.productId;

    const shoppingCart = await Cart.findById(id);

    const productToDelete = await Product.findById(productId);

    if (!productToDelete) return res.sendStatus(404);

    // await productToDelete.delete();
    const index = shoppingCart.cart.findIndex((prodId) => prodId == productId);
    shoppingCart.cart.splice(index, 1);

    await shoppingCart.save();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
