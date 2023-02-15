const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    //hittar mina produkter
    const products = await Product.find();

    //response mina produkter
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    //lägger mitt productId i en variabel
    const productId = req.params.productId;

    //hittar specifik produkt via productId
    const product = await Product.findById(productId);
    // om inte den specifika produkten hittas, skickas felmeddelande - NOT FOUND
    if (!product) return res.status(404);
    //response - den specifika produkten
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.addProductToCart = async (req, res) => {
  try {
    // lägger min productName i en variabel från schemaProduct.
    const productName = req.body.productName || "";
    //lägger mitt id i en variabel från SchemaCart.
    const id = req.body.id;
    //lägger mitt productId i en variabel från schemaProduct.
    const productId = req.params.productId;

    //hämtar mitt id från min varukorg(hela mitt objekt)
    const cartList = await Cart.findById(id);

    //felmeddelande
    if (!productName) {
      return res.status(400).json({
        message: "You must provide a product name",
      });
    }
    //hämtar mitt id från min produkt
    const productItem = await Product.findById(productId);

    //pushar mitt object till min Cart.
    cartList.cart.push({
      product: productId,
      quantity: 1,
    });

    //kopplar på min totalamount till min price, så att den lägger till
    //price i Cart amount.
    cartList.totalamount += productItem.price;

    //sparar min carts ändringar
    await cartList.save();

    //response - mitt objekt som pushas till listan.
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
    //lägger cartid i en variabel
    const id = req.body.id;
    //lägger productId i en variabel
    const productId = req.params.productId;
    //hittar min Cart med specifikt id
    const shoppingCart = await Cart.findById(id);
    //hittar min specifika produkt jag vill radera
    const productToDelete = await Product.findById(productId);

    //om det Id:t inte finns, skickas NOT FOUND
    if (!productToDelete) return res.sendStatus(404);

    // hittar index på specifik produkt/boject
    const index = shoppingCart.cart.findIndex(
      (object) => object?.product == productId
    );
    //går in i min cartSchema och sedan i cart. splice/tar bort specifik
    //produkt via index och 1 produkt i taget.
    shoppingCart.cart.splice(index, 1);

    //kopplar ihop totalamount till price, att totalamount uppdateras
    //när en produkt tas bort från listan.
    shoppingCart.totalamount -= productToDelete.price;

    //Cart har sparats
    await shoppingCart.save();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
