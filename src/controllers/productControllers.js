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
    //
    const productName = req.body.productName || "";
    const price = req.body.price;
    const id = req.body.id;
    let totalamount = req.body.totalamount;
    const productId = req.params.productId;
    //hämtar mitt id från min varukorg
    const cartList = await Cart.findById(id);

    // console.log(cartList);
    //felmeddelande
    if (!productName) {
      return res.status(400).json({
        message: "You must provide a product name",
      });
    }
    //hämtar mitt id från min produkt
    const productItem = await Product.findById(productId);
    // const productPrice = productItem.price;

    console.log(productItem);

    // totalamount = productItem.price;

    // const productPrice = await Product.find(price);
    // const cartTotalAmount = await Cart.findByIdAndUpdate(id, totalamount);

    cartList.cart.push({
      product: productId,
      quantity: 1,
    });

    cartList.totalamount += productItem.price;

    await cartList.save();

    // totalamount = 0;
    // for (let i = 0; i < productPrice.length; i++) {
    //   totalamount += productPrice[i];
    // }

    // if (totalamount) cartList.totalamount = totalamount;
    // await cartList.save();

    // let updatedCart = await Cart.updateOne({
    //   id: id,

    //   totalamount: totalamount,
    // });

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
    const index = shoppingCart.cart.findIndex(
      (object) => object?.product == productId
    );
    shoppingCart.cart.splice(index, 1);

    shoppingCart.totalamount -= productToDelete.price;

    await shoppingCart.save();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
